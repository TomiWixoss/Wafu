import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useStore } from '../store/useStore';
import { Chat, ChatMessage } from '../types/character';
import { streamChat } from '../services/ai';

export function ChatScreen({ route }: any) {
  const { chat: initialChat, character } = route.params;
  const { updateChat, aiSettings, loadAISettings } = useStore();

  const [chat, setChat] = useState<Chat>(initialChat);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadAISettings();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    if (!aiSettings?.apiKey) {
      Alert.alert('Error', 'Please configure your API key in Settings');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, userMessage],
      updatedAt: Date.now(),
    };

    setChat(updatedChat);
    setInput('');
    setIsGenerating(true);

    // Create assistant message placeholder
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setChat(prev => ({
      ...prev,
      messages: [...prev.messages, assistantMessage],
    }));

    try {
      let fullContent = '';
      let fullReasoning = '';

      for await (const chunk of streamChat(updatedChat.messages, character.card, aiSettings)) {
        if (chunk.content) {
          fullContent += chunk.content;
        }
        if (chunk.reasoning) {
          fullReasoning += chunk.reasoning;
        }

        // Update message in real-time
        setChat(prev => ({
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === assistantMessage.id
              ? { ...msg, content: fullContent, reasoning: fullReasoning }
              : msg
          ),
        }));
      }

      // Save final chat
      const finalChat = {
        ...updatedChat,
        messages: [
          ...updatedChat.messages,
          { ...assistantMessage, content: fullContent, reasoning: fullReasoning },
        ],
        updatedAt: Date.now(),
      };

      await updateChat(finalChat);
      setChat(finalChat);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate response: ' + (error as Error).message);
      
      // Remove failed message
      setChat(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => msg.id !== assistantMessage.id),
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';

    return (
      <View className={`mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
        <View
          className={`max-w-[80%] p-3 rounded-lg ${
            isUser
              ? 'bg-blue-500'
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          <Text className={isUser ? 'text-white' : 'text-gray-900 dark:text-white'}>
            {item.content}
          </Text>
          
          {item.reasoning && (
            <View className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
              <Text className="text-xs text-gray-600 dark:text-gray-400 italic">
                Thinking: {item.reasoning}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-100 dark:bg-gray-900"
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={chat.messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white mr-2"
            multiline
            maxLength={2000}
            editable={!isGenerating}
          />
          
          <TouchableOpacity
            onPress={handleSend}
            disabled={isGenerating || !input.trim()}
            className={`w-12 h-12 rounded-lg items-center justify-center ${
              isGenerating || !input.trim() ? 'bg-gray-300' : 'bg-blue-500'
            }`}
          >
            {isGenerating ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-xl">→</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

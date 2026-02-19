import React, { useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useChat } from '@/features/chat/hooks/useChat';
import { ChatMessage } from '@/features/chat/components/ChatMessage';
import { ChatInput } from '@/features/chat/components/ChatInput';

export function ChatScreen({ route }: any) {
  const { chat: initialChat, character } = route.params;
  const { chat, input, setInput, isGenerating, sendMessage } = useChat(initialChat, character);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    const result = await sendMessage();
    if (!result.success && result.error) {
      Alert.alert('Error', result.error);
    }
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
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        isGenerating={isGenerating}
      />
    </KeyboardAvoidingView>
  );
}

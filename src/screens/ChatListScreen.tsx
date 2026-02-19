import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { Chat } from '../types/character';
import * as storage from '../services/storage';

export function ChatListScreen({ route, navigation }: any) {
  const { character } = route.params;
  const { createChat, deleteChat, setCurrentCharacter, setCurrentChat } = useStore();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    setCurrentCharacter(character);
    loadChats();
  }, [character]);

  const loadChats = async () => {
    const characterChats = await storage.getChats(character.id);
    setChats(characterChats.sort((a, b) => b.updatedAt - a.updatedAt));
  };

  const handleNewChat = async () => {
    try {
      const chat = await createChat(character.id);
      setCurrentChat(chat);
      navigation.navigate('Chat', { chat, character });
    } catch (error) {
      Alert.alert('Error', 'Failed to create chat');
    }
  };

  const handleChatPress = (chat: Chat) => {
    setCurrentChat(chat);
    navigation.navigate('Chat', { chat, character });
  };

  const handleChatLongPress = (chat: Chat) => {
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteChat(chat.id);
            await loadChats();
          },
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const renderChat = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      onPress={() => handleChatPress(item)}
      onLongPress={() => handleChatLongPress(item)}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-3 shadow"
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
          {item.title}
        </Text>
        <Ionicons name="chatbubble-outline" size={20} color="#9CA3AF" />
      </View>
      <Text className="text-sm text-gray-600 dark:text-gray-400" numberOfLines={2}>
        {item.messages[item.messages.length - 1]?.content || 'No messages'}
      </Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name="time-outline" size={14} color="#9CA3AF" />
        <Text className="text-xs text-gray-500 dark:text-gray-500 ml-1">
          {formatDate(item.updatedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Chats with {character.name}
        </Text>

        {chats.length === 0 ? (
          <View className="items-center justify-center flex-1">
            <Ionicons name="chatbubbles-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 dark:text-gray-400 text-center mt-4 mb-2 text-lg">
              No chats yet
            </Text>
            <Text className="text-gray-400 dark:text-gray-500 text-center px-8">
              Start a new conversation!
            </Text>
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={renderChat}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        <TouchableOpacity
          onPress={handleNewChat}
          className="absolute bottom-6 right-6 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg"
          style={{ elevation: 5 }}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

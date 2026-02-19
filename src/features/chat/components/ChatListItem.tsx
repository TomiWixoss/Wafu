import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { Chat } from '@/types/character';

interface ChatListItemProps {
  chat: Chat;
  onPress: () => void;
  onLongPress: () => void;
}

export function ChatListItem({ chat, onPress, onLongPress }: ChatListItemProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];
  const timeAgo = formatDistanceToNow(chat.updatedAt, { addSuffix: true });

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-3 shadow"
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
          {chat.title}
        </Text>
        <Ionicons name="chatbubble-outline" size={20} color="#9CA3AF" />
      </View>
      <Text className="text-sm text-gray-600 dark:text-gray-400" numberOfLines={2}>
        {lastMessage?.content || 'No messages'}
      </Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name="time-outline" size={14} color="#9CA3AF" />
        <Text className="text-xs text-gray-500 dark:text-gray-500 ml-1">
          {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

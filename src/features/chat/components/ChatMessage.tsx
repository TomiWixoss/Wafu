import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { ChatMessage as ChatMessageType } from '@/types/character';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
      <View
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser ? 'bg-blue-500' : 'bg-white dark:bg-gray-800'
        }`}
      >
        {isUser ? (
          <Text className="text-white">{message.content}</Text>
        ) : (
          <Markdown
            style={{
              body: { color: '#111827' },
              text: { color: '#111827' },
              code_inline: { 
                backgroundColor: '#F3F4F6',
                color: '#1F2937',
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 4,
              },
              code_block: {
                backgroundColor: '#1F2937',
                color: '#F9FAFB',
                padding: 12,
                borderRadius: 8,
              },
              fence: {
                backgroundColor: '#1F2937',
                color: '#F9FAFB',
                padding: 12,
                borderRadius: 8,
              },
            }}
          >
            {message.content || '_Thinking..._'}
          </Markdown>
        )}
        
        {message.reasoning && <ThinkingProcess reasoning={message.reasoning} />}
      </View>
    </View>
  );
}

function ThinkingProcess({ reasoning }: { reasoning: string }) {
  return (
    <View className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
      <View className="flex-row items-center mb-1">
        <Ionicons name="bulb-outline" size={14} color="#9CA3AF" />
        <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1 font-semibold">
          Thinking Process
        </Text>
      </View>
      <Text className="text-xs text-gray-600 dark:text-gray-400 italic">
        {reasoning}
      </Text>
    </View>
  );
}

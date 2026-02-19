import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { ChatMessage as ChatMessageType } from '@/types/character';
import { STRINGS } from '@/constants/strings';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <View className={`mb-4 ${isUser ? 'items-end' : 'items-start w-full'}`}>
      {/* Reasoning section (AI only, shown first) */}
      {!isUser && message.reasoning && (
        <ThinkingProcess reasoning={message.reasoning} />
      )}

      {/* Main message content */}
      <View
        className={`${
          isUser 
            ? 'max-w-[80%] p-3 rounded-lg bg-blue-500' 
            : 'w-full'
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
              image: {
                maxWidth: 200,
                maxHeight: 200,
              },
            }}
            rules={{
              image: (node, children, parent, styles) => {
                return null; // Disable images in markdown to avoid key prop error
              },
            }}
          >
            {message.content || `_${STRINGS.thinking}_`}
          </Markdown>
        )}
      </View>
    </View>
  );
}

function ThinkingProcess({ reasoning }: { reasoning: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="w-full mb-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
      <TouchableOpacity 
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center flex-1">
          <Ionicons name="bulb" size={16} color="#F59E0B" />
          <Text className="text-sm text-amber-700 dark:text-amber-400 ml-2 font-semibold">
            {STRINGS.thinkingProcess}
          </Text>
        </View>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#F59E0B" 
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <Text className="text-sm text-amber-800 dark:text-amber-300 mt-2 leading-5">
          {reasoning}
        </Text>
      )}
    </View>
  );
}

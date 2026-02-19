import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <View className="items-center justify-center flex-1">
      <Ionicons name={icon} size={64} color="#9CA3AF" />
      <Text className="text-gray-500 dark:text-gray-400 text-center mt-4 mb-2 text-lg">
        {title}
      </Text>
      <Text className="text-gray-400 dark:text-gray-500 text-center px-8">
        {description}
      </Text>
    </View>
  );
}

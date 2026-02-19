import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function EmptyCharacterList() {
  return (
    <View className="items-center justify-center flex-1">
      <Ionicons name="people-outline" size={64} color="#9CA3AF" />
      <Text className="text-gray-500 dark:text-gray-400 text-center mt-4 mb-2 text-lg">
        No characters yet
      </Text>
      <Text className="text-gray-400 dark:text-gray-500 text-center px-8">
        Import a character card to get started!
      </Text>
    </View>
  );
}

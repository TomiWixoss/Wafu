import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '@/types/character';

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
  onLongPress: () => void;
}

export function CharacterCard({ character, onPress, onLongPress }: CharacterCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-row items-center p-4 bg-white dark:bg-gray-800 rounded-lg mb-3 shadow"
    >
      <Image
        source={{ uri: `data:image/png;base64,${character.avatar}` }}
        className="w-16 h-16 rounded-full"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-gray-900 dark:text-white">
          {character.name}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400" numberOfLines={2}>
          {character.card.data.description || 'No description'}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

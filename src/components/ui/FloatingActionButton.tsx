import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function FloatingActionButton({ onPress, icon = 'add' }: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-6 right-6 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg"
      style={{ elevation: 5 }}
    >
      <Ionicons name={icon} size={32} color="white" />
    </TouchableOpacity>
  );
}

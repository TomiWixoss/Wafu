import React from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, isGenerating, disabled }: ChatInputProps) {
  const canSend = !isGenerating && value.trim().length > 0 && !disabled;

  return (
    <View className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center">
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-white mr-2"
          multiline
          maxLength={2000}
          editable={!isGenerating && !disabled}
        />
        
        <TouchableOpacity
          onPress={onSend}
          disabled={!canSend}
          className={`w-12 h-12 rounded-lg items-center justify-center ${
            canSend ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          {isGenerating ? (
            <ActivityIndicator color="white" />
          ) : (
            <Ionicons name="send" size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

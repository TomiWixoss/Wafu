import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AI_MODELS } from '@/constants/models';
import { STRINGS } from '@/constants/strings';

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (model: string) => void;
}

export function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <Ionicons name="cube-outline" size={18} color="#6B7280" />
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
          {STRINGS.model}
        </Text>
      </View>
      {AI_MODELS.map((model) => (
        <TouchableOpacity
          key={model.value}
          onPress={() => onSelect(model.value)}
          className={`p-3 rounded-lg mb-2 ${
            selectedModel === model.value
              ? 'bg-blue-500'
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text
                  className={
                    selectedModel === model.value
                      ? 'text-white font-semibold'
                      : 'text-gray-900 dark:text-white'
                  }
                >
                  {model.label}
                </Text>
                {model.recommended && (
                  <View className="ml-2 px-2 py-0.5 bg-green-500 rounded">
                    <Text className="text-white text-xs font-semibold">{STRINGS.recommended}</Text>
                  </View>
                )}
              </View>
              <Text
                className={`text-xs mt-1 ${
                  selectedModel === model.value
                    ? 'text-blue-100'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {model.description}
              </Text>
            </View>
            {selectedModel === model.value && (
              <Ionicons name="checkmark-circle" size={24} color="white" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

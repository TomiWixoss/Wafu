import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ParameterSliderProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  description?: string;
}

export function ParameterSlider({
  icon,
  label,
  value,
  onChange,
  min,
  max,
  step = 0.01,
  description,
}: ParameterSliderProps) {
  const handleChange = (text: string) => {
    const val = parseFloat(text) || min;
    onChange(Math.max(min, Math.min(max, val)));
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <Ionicons name={icon} size={18} color="#6B7280" />
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
          {label}: {value.toFixed(2)}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-gray-600 dark:text-gray-400 mr-2">{min}</Text>
        <View className="flex-1">
          <TextInput
            value={value.toString()}
            onChangeText={handleChange}
            keyboardType="decimal-pad"
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white text-center"
          />
        </View>
        <Text className="text-gray-600 dark:text-gray-400 ml-2">{max}</Text>
      </View>
      {description && (
        <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </Text>
      )}
    </View>
  );
}

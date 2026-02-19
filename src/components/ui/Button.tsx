import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';

interface ButtonProps {
  onPress: () => void;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

export function Button({ 
  onPress, 
  title, 
  icon, 
  variant = 'primary', 
  loading, 
  disabled 
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonClass = clsx(
    'p-4 rounded-lg items-center flex-row justify-center',
    {
      'bg-blue-500': variant === 'primary' && !isDisabled,
      'bg-gray-500': variant === 'secondary' && !isDisabled,
      'bg-red-500': variant === 'danger' && !isDisabled,
      'bg-gray-300': isDisabled,
    }
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={buttonClass}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={24} color="white" />}
          <Text className="text-white font-semibold text-lg ml-2">
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

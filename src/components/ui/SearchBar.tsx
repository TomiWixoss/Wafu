import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADII, SPACING, FONT_FAMILY, FONT_SIZE } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search...' }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.neutral[100],
        borderRadius: RADII.xl,
        paddingHorizontal: SPACING.lg,
        borderWidth: 1.5,
        borderColor: isFocused ? COLORS.primary[500] : 'transparent',
      }}
    >
      <Ionicons name="search" size={18} color={COLORS.neutral[400]} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.neutral[400]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          fontFamily: FONT_FAMILY.regular,
          fontSize: FONT_SIZE.base,
          color: COLORS.neutral[900],
          paddingVertical: SPACING.lg,
          marginLeft: SPACING.md,
        }}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={COLORS.neutral[400]} />
        </TouchableOpacity>
      )}
    </View>
  );
}

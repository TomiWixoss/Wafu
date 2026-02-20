import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/constants/theme';

interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  if (!label) {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.neutral[200],
          marginVertical: SPACING.xl,
        }}
      />
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.xl,
      }}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: COLORS.neutral[200] }} />
      <Text
        style={{
          fontFamily: FONT_FAMILY.medium,
          fontSize: FONT_SIZE.xs,
          color: COLORS.neutral[400],
          marginHorizontal: SPACING.lg,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        {label}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: COLORS.neutral[200] }} />
    </View>
  );
}

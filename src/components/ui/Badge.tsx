import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADII, SPACING } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
}

const BADGE_COLORS = {
  primary: { bg: COLORS.primary[100], text: COLORS.primary[700] },
  success: { bg: COLORS.success.light, text: COLORS.success.dark },
  warning: { bg: COLORS.warning.light, text: COLORS.warning.dark },
  neutral: { bg: COLORS.neutral[100], text: COLORS.neutral[600] },
};

export function Badge({ label, variant = 'primary', size = 'sm' }: BadgeProps) {
  const colors = BADGE_COLORS[variant];
  const isSmall = size === 'sm';

  return (
    <View
      style={{
        backgroundColor: colors.bg,
        paddingHorizontal: isSmall ? SPACING.md : SPACING.lg,
        paddingVertical: isSmall ? 2 : SPACING.xs,
        borderRadius: RADII.md,
      }}
    >
      <Text
        style={{
          fontFamily: FONT_FAMILY.semibold,
          fontSize: isSmall ? FONT_SIZE.xs : FONT_SIZE.sm,
          color: colors.text,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

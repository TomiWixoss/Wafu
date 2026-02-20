import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/constants/theme';
import { Button } from './Button';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING['5xl'],
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: COLORS.neutral[100],
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: SPACING['3xl'],
        }}
      >
        <Ionicons name={icon} size={36} color={COLORS.neutral[400]} />
      </View>
      <Text
        style={{
          fontFamily: FONT_FAMILY.semibold,
          fontSize: FONT_SIZE.xl,
          color: COLORS.neutral[700],
          textAlign: 'center',
          marginBottom: SPACING.md,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: FONT_FAMILY.regular,
          fontSize: FONT_SIZE.base,
          color: COLORS.neutral[400],
          textAlign: 'center',
          lineHeight: 22,
        }}
      >
        {description}
      </Text>
      {actionLabel && onAction && (
        <View style={{ marginTop: SPACING['3xl'] }}>
          <Button
            onPress={onAction}
            title={actionLabel}
            size="sm"
            variant="secondary"
            fullWidth={false}
          />
        </View>
      )}
    </View>
  );
}

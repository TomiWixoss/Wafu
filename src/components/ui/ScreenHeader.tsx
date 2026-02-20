import React from 'react';
import { View, Text, ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, SPACING } from '@/constants/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ScreenHeader({ title, subtitle, rightContent, leftContent, style }: ScreenHeaderProps) {
  return (
    <SafeAreaView
      edges={['top']}
      style={[
        {
          backgroundColor: COLORS.neutral[0],
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.neutral[200],
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SPACING.xl,
          paddingTop: SPACING.md,
          paddingBottom: SPACING.lg,
        }}
      >
        {leftContent && <View style={{ marginRight: SPACING.lg }}>{leftContent}</View>}

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.bold,
              fontSize: FONT_SIZE['3xl'],
              lineHeight: LINE_HEIGHT['3xl'],
              color: COLORS.neutral[900],
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.sm,
                lineHeight: LINE_HEIGHT.sm,
                color: COLORS.neutral[500],
                marginTop: 2,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {rightContent && <View style={{ marginLeft: SPACING.lg }}>{rightContent}</View>}
      </View>
    </SafeAreaView>
  );
}

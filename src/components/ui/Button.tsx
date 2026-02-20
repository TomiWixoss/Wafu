import React from 'react';
import { Text, ActivityIndicator, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADII, FONT_FAMILY, FONT_SIZE, SPACING, SHADOWS, ANIMATION } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  onPress: () => void;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const VARIANT_STYLES = {
  primary: {
    bg: COLORS.primary[600],
    bgDisabled: COLORS.neutral[200],
    text: COLORS.neutral[0],
    textDisabled: COLORS.neutral[400],
  },
  secondary: {
    bg: COLORS.neutral[100],
    bgDisabled: COLORS.neutral[100],
    text: COLORS.neutral[800],
    textDisabled: COLORS.neutral[400],
  },
  danger: {
    bg: COLORS.error.main,
    bgDisabled: COLORS.neutral[200],
    text: COLORS.neutral[0],
    textDisabled: COLORS.neutral[400],
  },
  ghost: {
    bg: 'transparent',
    bgDisabled: 'transparent',
    text: COLORS.primary[600],
    textDisabled: COLORS.neutral[400],
  },
};

const SIZE_STYLES = {
  sm: { paddingH: SPACING.lg, paddingV: SPACING.md, fontSize: FONT_SIZE.sm, iconSize: 16 },
  md: { paddingH: SPACING.xl, paddingV: SPACING.lg, fontSize: FONT_SIZE.base, iconSize: 20 },
  lg: { paddingH: SPACING['3xl'], paddingV: SPACING.xl, fontSize: FONT_SIZE.lg, iconSize: 22 },
};

export function Button({
  onPress,
  title,
  icon,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  fullWidth = true,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const isDisabled = disabled || loading;
  const v = VARIANT_STYLES[variant];
  const s = SIZE_STYLES[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={() => {
        if (!isDisabled) scale.value = withSpring(ANIMATION.pressScale, ANIMATION.spring);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, ANIMATION.spring);
      }}
      style={[
        animatedStyle,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDisabled ? v.bgDisabled : v.bg,
          paddingHorizontal: s.paddingH,
          paddingVertical: s.paddingV,
          borderRadius: RADII.xl,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          ...(variant !== 'ghost' && !isDisabled ? SHADOWS.sm : {}),
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.text} size="small" />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={s.iconSize}
              color={isDisabled ? v.textDisabled : v.text}
              style={{ marginRight: SPACING.md }}
            />
          )}
          <Text
            style={{
              fontFamily: FONT_FAMILY.semibold,
              fontSize: s.fontSize,
              color: isDisabled ? v.textDisabled : v.text,
            }}
          >
            {title}
          </Text>
        </>
      )}
    </AnimatedPressable>
  );
}

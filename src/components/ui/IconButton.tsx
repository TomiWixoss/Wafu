import React from 'react';
import { Pressable, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADII, ANIMATION, SPACING } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type IconButtonVariant = 'filled' | 'outlined' | 'ghost';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const SIZES = {
  sm: { container: 32, icon: 16 },
  md: { container: 40, icon: 20 },
  lg: { container: 48, icon: 24 },
};

export function IconButton({
  icon,
  onPress,
  variant = 'ghost',
  size = 'md',
  color,
  style,
  disabled,
}: IconButtonProps) {
  const scale = useSharedValue(1);
  const { container, icon: iconSize } = SIZES[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconColor = disabled
    ? COLORS.neutral[300]
    : color || (variant === 'filled' ? COLORS.neutral[0] : COLORS.neutral[700]);

  const bgColor = disabled
    ? COLORS.neutral[100]
    : variant === 'filled'
      ? COLORS.primary[600]
      : variant === 'outlined'
        ? 'transparent'
        : 'transparent';

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => {
        scale.value = withSpring(0.9, ANIMATION.spring);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, ANIMATION.spring);
      }}
      style={[
        animatedStyle,
        {
          width: container,
          height: container,
          borderRadius: container / 2,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: variant === 'outlined' ? 1.5 : 0,
          borderColor: variant === 'outlined' ? COLORS.neutral[200] : 'transparent',
        },
        style,
      ]}
    >
      <Ionicons name={icon} size={iconSize} color={iconColor} />
    </AnimatedPressable>
  );
}

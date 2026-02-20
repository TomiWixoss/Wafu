import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, ANIMATION } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function FloatingActionButton({ onPress, icon = 'add' }: FloatingActionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.9, ANIMATION.spring);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, ANIMATION.spring);
      }}
      style={[
        animatedStyle,
        {
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: COLORS.primary[600],
          alignItems: 'center',
          justifyContent: 'center',
          ...SHADOWS.lg,
        },
      ]}
    >
      <Ionicons name={icon} size={28} color={COLORS.neutral[0]} />
    </AnimatedPressable>
  );
}

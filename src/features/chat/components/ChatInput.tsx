import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING, RADII, SHADOWS, ANIMATION } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ChatInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, isGenerating, disabled }: ChatInputProps) {
  const canSend = !isGenerating && value.trim().length > 0 && !disabled;
  const sendScale = useSharedValue(1);
  const [inputHeight, setInputHeight] = useState(44);

  const sendAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sendScale.value }],
  }));

  const handleSend = () => {
    if (!canSend) return;
    sendScale.value = withSequence(
      withSpring(0.85, { duration: 100 }),
      withSpring(1, ANIMATION.spring),
    );
    onSend();
  };

  const charCount = value.length;
  const maxChars = 2000;

  return (
    <View
      style={{
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.neutral[0],
        borderTopWidth: 0.5,
        borderTopColor: COLORS.neutral[200],
      }}
    >
      {/* Typing indicator when generating */}
      {isGenerating && <TypingIndicator />}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: SPACING.md,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.neutral[100],
            borderRadius: RADII['2xl'],
            paddingHorizontal: SPACING.xl,
            paddingVertical: SPACING.md,
            maxHeight: 120,
          }}
        >
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={STRINGS.typeMessage}
            placeholderTextColor={COLORS.neutral[400]}
            multiline
            maxLength={maxChars}
            editable={!isGenerating && !disabled}
            onContentSizeChange={(e) => {
              const h = e.nativeEvent.contentSize.height;
              setInputHeight(Math.min(Math.max(h, 44), 100));
            }}
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: FONT_SIZE.base,
              color: COLORS.neutral[900],
              minHeight: 24,
              maxHeight: 100,
            }}
          />
          {charCount > maxChars * 0.8 && (
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.xs,
                color: charCount >= maxChars ? COLORS.error.main : COLORS.neutral[400],
                textAlign: 'right',
                marginTop: 2,
              }}
            >
              {charCount}/{maxChars}
            </Text>
          )}
        </View>

        <AnimatedPressable
          onPress={handleSend}
          disabled={!canSend}
          style={[
            sendAnimatedStyle,
            {
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: canSend ? COLORS.primary[600] : COLORS.neutral[200],
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 2,
            },
          ]}
        >
          {isGenerating ? (
            <ActivityIndicator color={COLORS.neutral[0]} size="small" />
          ) : (
            <Ionicons name="arrow-up" size={20} color={COLORS.neutral[0]} />
          )}
        </AnimatedPressable>
      </View>
    </View>
  );
}

function TypingIndicator() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
        paddingHorizontal: SPACING.xs,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {[0, 1, 2].map((i) => (
          <TypingDot key={i} delay={i * 200} />
        ))}
      </View>
      <Text
        style={{
          fontFamily: FONT_FAMILY.regular,
          fontSize: FONT_SIZE.xs,
          color: COLORS.neutral[400],
          marginLeft: SPACING.md,
        }}
      >
        {STRINGS.thinking}
      </Text>
    </View>
  );
}

function TypingDot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 }),
        ),
        -1,
      );
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: COLORS.primary[500],
        },
      ]}
    />
  );
}

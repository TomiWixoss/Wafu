import React, { useRef, useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Alert, Keyboard, View, Pressable } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChat } from '@/features/chat/hooks/useChat';
import { ChatMessage } from '@/features/chat/components/ChatMessage';
import { ChatInput } from '@/features/chat/components/ChatInput';
import { COLORS, SPACING, SHADOWS, ANIMATION } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ChatScreen({ route }: any) {
  const { chat: initialChat, character } = route.params;
  const { chat, input, setInput, isGenerating, sendMessage, deleteMessage } = useChat(initialChat, character);
  const flatListRef = useRef<FlatList>(null);
  const headerHeight = useHeaderHeight();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollButtonOpacity = useSharedValue(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSend = async () => {
    const result = await sendMessage();
    if (!result.success && result.error) {
      Alert.alert(STRINGS.error, result.error);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    Alert.alert(STRINGS.deleteMessage, STRINGS.deleteMessageConfirm, [
      { text: STRINGS.cancel, style: 'cancel' },
      {
        text: STRINGS.delete,
        style: 'destructive',
        onPress: () => deleteMessage(messageId),
      },
    ]);
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isNearBottom = contentOffset.y >= contentSize.height - layoutMeasurement.height - 100;
    setShowScrollButton(!isNearBottom);
    scrollButtonOpacity.value = withTiming(isNearBottom ? 0 : 1, { duration: 200 });
  };

  const scrollButtonStyle = useAnimatedStyle(() => ({
    opacity: scrollButtonOpacity.value,
    transform: [{ scale: scrollButtonOpacity.value }],
  }));

  // Filter out system messages for display
  const visibleMessages = chat.messages.filter(m => m.role !== 'system');

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: COLORS.neutral[50] }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : headerHeight - 190}
    >
      <FlatList
        ref={flatListRef}
        data={visibleMessages}
        renderItem={({ item }) => (
          <ChatMessage
            message={item}
            onDelete={() => handleDeleteMessage(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: SPACING.xl,
          paddingTop: SPACING.xl,
          paddingBottom: SPACING['6xl'],
        }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <AnimatedPressable
          onPress={scrollToEnd}
          style={[
            scrollButtonStyle,
            {
              position: 'absolute',
              bottom: 100,
              alignSelf: 'center',
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.neutral[0],
              alignItems: 'center',
              justifyContent: 'center',
              ...SHADOWS.md,
            },
          ]}
        >
          <Ionicons name="chevron-down" size={20} color={COLORS.neutral[600]} />
        </AnimatedPressable>
      )}

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        isGenerating={isGenerating}
      />
    </KeyboardAvoidingView>
  );
}

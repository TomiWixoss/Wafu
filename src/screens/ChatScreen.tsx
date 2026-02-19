import React, { useRef, useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Alert, Keyboard, StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useChat } from '@/features/chat/hooks/useChat';
import { ChatMessage } from '@/features/chat/components/ChatMessage';
import { ChatInput } from '@/features/chat/components/ChatInput';
import { STRINGS } from '@/constants/strings';

export function ChatScreen({ route }: any) {
  const { chat: initialChat, character } = route.params;
  const { chat, input, setInput, isGenerating, sendMessage } = useChat(initialChat, character);
  const flatListRef = useRef<FlatList>(null);
  const headerHeight = useHeaderHeight();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

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

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 bg-gray-100 dark:bg-gray-900"
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : headerHeight - 190}
    >
      <FlatList
        ref={flatListRef}
        data={chat.messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        keyboardShouldPersistTaps="handled"
      />

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        isGenerating={isGenerating}
      />
    </KeyboardAvoidingView>
  );
}

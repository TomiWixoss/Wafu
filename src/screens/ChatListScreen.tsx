import React from 'react';
import { View, Text, FlatList, Alert, Platform, StatusBar } from 'react-native';
import { useChatList } from '@/features/chat/hooks/useChatList';
import { ChatListItem } from '@/features/chat/components/ChatListItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { showDeleteConfirm } from '@/utils/alerts';
import { Chat } from '@/types/character';
import { STRINGS } from '@/constants/strings';

export function ChatListScreen({ route, navigation }: any) {
  const { character } = route.params;
  const { chats, isLoading, createNewChat, removeChat, setCurrentChat } = useChatList(character);
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  const handleNewChat = async () => {
    try {
      const chat = await createNewChat();
      navigation.navigate('Chat', { chat, character });
    } catch (error) {
      Alert.alert(STRINGS.error, STRINGS.failedToCreate);
    }
  };

  const handleChatPress = (chat: Chat) => {
    setCurrentChat(chat);
    navigation.navigate('Chat', { chat, character });
  };

  const handleChatLongPress = (chat: Chat) => {
    showDeleteConfirm(STRINGS.deleteChat, () => removeChat(chat.id));
  };

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {STRINGS.chatsWith} {character.name}
        </Text>

        {chats.length === 0 ? (
          <EmptyState
            icon="chatbubbles-outline"
            title={STRINGS.noChats}
            description={STRINGS.noChatsDesc}
          />
        ) : (
          <FlatList
            data={chats}
            renderItem={({ item }) => (
              <ChatListItem
                chat={item}
                onPress={() => handleChatPress(item)}
                onLongPress={() => handleChatLongPress(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        <FloatingActionButton onPress={handleNewChat} />
      </View>
    </View>
  );
}

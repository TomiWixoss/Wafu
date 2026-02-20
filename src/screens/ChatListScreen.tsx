import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useChatList } from '@/features/chat/hooks/useChatList';
import { ChatListItem } from '@/features/chat/components/ChatListItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { showDeleteConfirm } from '@/utils/alerts';
import { Chat } from '@/types/character';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING, LINE_HEIGHT } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';

export function ChatListScreen({ route, navigation }: any) {
  const { character } = route.params;
  const { chats, isLoading, createNewChat, removeChat, setCurrentChat } = useChatList(character);

  const handleNewChat = async () => {
    try {
      // Check for alternate greetings
      const altGreetings = character.card.data.alternate_greetings;
      if (altGreetings && altGreetings.length > 0) {
        const options = [
          { text: STRINGS.cancel, style: 'cancel' as const },
          {
            text: character.card.data.first_mes?.slice(0, 30) + '...' || 'Default',
            onPress: async () => {
              const chat = await createNewChat();
              navigation.navigate('Chat', { chat, character });
            },
          },
          ...altGreetings.map((greeting: string, i: number) => ({
            text: greeting.slice(0, 30) + '...',
            onPress: async () => {
              const chat = await createNewChat(greeting);
              navigation.navigate('Chat', { chat, character });
            },
          })),
        ];
        Alert.alert(STRINGS.selectGreeting, undefined, options);
      } else {
        const chat = await createNewChat();
        navigation.navigate('Chat', { chat, character });
      }
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
    <View style={{ flex: 1, backgroundColor: COLORS.neutral[50] }}>
      <View style={{ flex: 1, paddingHorizontal: SPACING.xl }}>
        {/* Character Info Card */}
        <View style={{ marginTop: SPACING.xl, marginBottom: SPACING.xl }}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar uri={character.avatar} name={character.name} size="xl" />
              <View style={{ flex: 1, marginLeft: SPACING.xl }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.bold,
                    fontSize: FONT_SIZE.xl,
                    lineHeight: LINE_HEIGHT.xl,
                    color: COLORS.neutral[900],
                  }}
                >
                  {character.name}
                </Text>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.regular,
                    fontSize: FONT_SIZE.sm,
                    color: COLORS.neutral[500],
                    marginTop: 2,
                  }}
                >
                  {chats.length} {STRINGS.totalChats}
                </Text>
              </View>
            </View>
          </Card>
        </View>

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
            showsVerticalScrollIndicator={false}
          />
        )}

        <FloatingActionButton onPress={handleNewChat} icon="chatbubble" />
      </View>
    </View>
  );
}

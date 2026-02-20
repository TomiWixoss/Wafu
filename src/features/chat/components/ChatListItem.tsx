import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Chat } from '@/types/character';
import { Card } from '@/components/ui/Card';
import { COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, SPACING } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';

interface ChatListItemProps {
  chat: Chat;
  onPress: () => void;
  onLongPress: () => void;
}

export function ChatListItem({ chat, onPress, onLongPress }: ChatListItemProps) {
  const lastMessage = chat.messages.filter(m => !m.isDeleted).pop();
  const timeAgo = formatDistanceToNow(chat.updatedAt, { addSuffix: true, locale: vi });
  const messageCount = chat.messages.filter(m => !m.isDeleted).length;

  return (
    <View style={{ marginBottom: SPACING.lg }}>
      <Card onPress={onPress} onLongPress={onLongPress}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: SPACING.lg }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.semibold,
                fontSize: FONT_SIZE.base,
                lineHeight: LINE_HEIGHT.base,
                color: COLORS.neutral[900],
              }}
              numberOfLines={1}
            >
              {chat.title}
            </Text>

            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.sm,
                lineHeight: LINE_HEIGHT.sm,
                color: COLORS.neutral[500],
                marginTop: SPACING.xs,
              }}
              numberOfLines={2}
            >
              {lastMessage?.content || STRINGS.noMessages}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.xs,
                color: COLORS.neutral[400],
              }}
            >
              {timeAgo}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SPACING.sm,
              }}
            >
              <Ionicons name="chatbubble-outline" size={12} color={COLORS.neutral[400]} />
              <Text
                style={{
                  fontFamily: FONT_FAMILY.medium,
                  fontSize: FONT_SIZE.xs,
                  color: COLORS.neutral[400],
                  marginLeft: 3,
                }}
              >
                {messageCount}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}

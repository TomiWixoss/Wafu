import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import * as Clipboard from 'expo-clipboard';
import { ChatMessage as ChatMessageType } from '@/types/character';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING, RADII, LINE_HEIGHT } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';

interface ChatMessageProps {
  message: ChatMessageType;
  onDelete?: () => void;
  onRegenerate?: () => void;
}

export function ChatMessage({ message, onDelete, onRegenerate }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [showTimestamp, setShowTimestamp] = useState(false);

  if (message.isDeleted) {
    return (
      <View style={{ marginBottom: SPACING.lg, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <View
          style={{
            paddingHorizontal: SPACING.xl,
            paddingVertical: SPACING.md,
            borderRadius: RADII.xl,
            backgroundColor: COLORS.neutral[100],
          }}
        >
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: FONT_SIZE.sm,
              color: COLORS.neutral[400],
              fontStyle: 'italic',
            }}
          >
            {STRINGS.messageDeleted}
          </Text>
        </View>
      </View>
    );
  }

  const handleLongPress = () => {
    const actions: any[] = [
      {
        text: STRINGS.copy,
        onPress: async () => {
          try {
            await Clipboard.setStringAsync(message.content);
          } catch {}
        },
      },
    ];

    if (!isUser && onRegenerate) {
      actions.push({
        text: STRINGS.regenerate,
        onPress: onRegenerate,
      });
    }

    if (onDelete) {
      actions.push({
        text: STRINGS.delete,
        style: 'destructive',
        onPress: onDelete,
      });
    }

    actions.push({ text: STRINGS.cancel, style: 'cancel' });

    Alert.alert(STRINGS.messageActions, undefined, actions);
  };

  const formattedTime = new Date(message.timestamp).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={{ marginBottom: SPACING.xl, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
      {/* Thinking */}
      {!isUser && message.reasoning && (
        <ThinkingProcess reasoning={message.reasoning} />
      )}

      {/* Bubble */}
      <TouchableOpacity
        onPress={() => setShowTimestamp(!showTimestamp)}
        onLongPress={handleLongPress}
        activeOpacity={0.7}
        style={{
          maxWidth: isUser ? '80%' : '100%',
          ...(isUser
            ? {
                backgroundColor: COLORS.primary[600],
                paddingHorizontal: SPACING.xl,
                paddingVertical: SPACING.lg,
                borderRadius: RADII['2xl'],
                borderBottomRightRadius: RADII.sm,
              }
            : {}),
        }}
      >
        {isUser ? (
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: FONT_SIZE.base,
              lineHeight: LINE_HEIGHT.base,
              color: COLORS.neutral[0],
            }}
          >
            {message.content}
          </Text>
        ) : (
          <Markdown
            style={{
              body: {
                color: COLORS.neutral[800],
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.base,
                lineHeight: LINE_HEIGHT.base,
              },
              text: {
                color: COLORS.neutral[800],
              },
              strong: {
                fontFamily: FONT_FAMILY.semibold,
                color: COLORS.neutral[900],
              },
              em: {
                fontFamily: FONT_FAMILY.regular,
                fontStyle: 'italic',
              },
              code_inline: {
                backgroundColor: COLORS.neutral[100],
                color: COLORS.primary[700],
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: RADII.sm,
                fontFamily: 'monospace',
                fontSize: FONT_SIZE.sm,
              },
              code_block: {
                backgroundColor: COLORS.neutral[900],
                color: COLORS.neutral[100],
                padding: SPACING.xl,
                borderRadius: RADII.lg,
                fontFamily: 'monospace',
                fontSize: FONT_SIZE.sm,
              },
              fence: {
                backgroundColor: COLORS.neutral[900],
                color: COLORS.neutral[100],
                padding: SPACING.xl,
                borderRadius: RADII.lg,
                fontFamily: 'monospace',
                fontSize: FONT_SIZE.sm,
              },
              heading1: {
                fontFamily: FONT_FAMILY.bold,
                fontSize: FONT_SIZE['2xl'],
                color: COLORS.neutral[900],
              },
              heading2: {
                fontFamily: FONT_FAMILY.bold,
                fontSize: FONT_SIZE.xl,
                color: COLORS.neutral[900],
              },
              heading3: {
                fontFamily: FONT_FAMILY.semibold,
                fontSize: FONT_SIZE.lg,
                color: COLORS.neutral[900],
              },
              blockquote: {
                borderLeftColor: COLORS.primary[400],
                borderLeftWidth: 3,
                paddingLeft: SPACING.lg,
                backgroundColor: COLORS.neutral[50],
                borderRadius: RADII.sm,
              },
              list_item: {
                color: COLORS.neutral[800],
              },
              image: { maxWidth: 200, maxHeight: 200 },
            }}
            rules={{
              image: () => null,
            }}
          >
            {message.content || `_${STRINGS.thinking}_`}
          </Markdown>
        )}
      </TouchableOpacity>

      {/* Timestamp */}
      {showTimestamp && (
        <Text
          style={{
            fontFamily: FONT_FAMILY.regular,
            fontSize: FONT_SIZE.xs,
            color: COLORS.neutral[400],
            marginTop: SPACING.xs,
            marginHorizontal: SPACING.xs,
          }}
        >
          {formattedTime}
        </Text>
      )}
    </View>
  );
}

function ThinkingProcess({ reasoning }: { reasoning: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View
      style={{
        width: '100%',
        marginBottom: SPACING.md,
        padding: SPACING.lg,
        backgroundColor: COLORS.warning.light,
        borderRadius: RADII.xl,
        borderWidth: 1,
        borderColor: COLORS.neutral[200],
      }}
    >
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: COLORS.warning.main + '20',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SPACING.md,
            }}
          >
            <Ionicons name="bulb" size={14} color={COLORS.warning.main} />
          </View>
          <Text
            style={{
              fontFamily: FONT_FAMILY.semibold,
              fontSize: FONT_SIZE.sm,
              color: COLORS.warning.dark,
            }}
          >
            {STRINGS.thinkingProcess}
          </Text>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={COLORS.warning.dark}
        />
      </TouchableOpacity>

      {isExpanded && (
        <Text
          style={{
            fontFamily: FONT_FAMILY.regular,
            fontSize: FONT_SIZE.sm,
            lineHeight: LINE_HEIGHT.base,
            color: COLORS.warning.dark,
            marginTop: SPACING.lg,
            opacity: 0.85,
          }}
        >
          {reasoning}
        </Text>
      )}
    </View>
  );
}

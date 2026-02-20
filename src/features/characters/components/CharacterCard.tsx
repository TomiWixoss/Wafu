import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '@/types/character';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING, LINE_HEIGHT } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
  onLongPress: () => void;
  onToggleFavorite?: () => void;
  chatCount?: number;
}

export function CharacterCard({
  character,
  onPress,
  onLongPress,
  onToggleFavorite,
  chatCount,
}: CharacterCardProps) {
  const tags = character.card.data.tags?.slice(0, 3) || [];

  return (
    <View style={{ marginBottom: SPACING.lg }}>
      <Card onPress={onPress} onLongPress={onLongPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar uri={character.avatar} name={character.name} size="xl" />

          <View style={{ flex: 1, marginLeft: SPACING.xl }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.semibold,
                  fontSize: FONT_SIZE.lg,
                  lineHeight: LINE_HEIGHT.lg,
                  color: COLORS.neutral[900],
                  flex: 1,
                }}
                numberOfLines={1}
              >
                {character.name}
              </Text>
              {character.isFavorite && (
                <Ionicons
                  name="star"
                  size={16}
                  color={COLORS.warning.main}
                  style={{ marginLeft: SPACING.sm }}
                />
              )}
            </View>

            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.sm,
                lineHeight: LINE_HEIGHT.sm,
                color: COLORS.neutral[500],
              }}
              numberOfLines={2}
            >
              {character.card.data.description || STRINGS.noDescription}
            </Text>

            {(tags.length > 0 || chatCount !== undefined) && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: SPACING.md,
                  gap: SPACING.sm,
                }}
              >
                {tags.map((tag, i) => (
                  <Badge key={i} label={tag} variant="neutral" size="sm" />
                ))}
                {chatCount !== undefined && chatCount > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: tags.length > 0 ? SPACING.xs : 0,
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
                      {chatCount}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.neutral[300]}
            style={{ marginLeft: SPACING.md }}
          />
        </View>
      </Card>
    </View>
  );
}

import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, AVATAR_SIZE, RADII, TYPOGRAPHY, FONT_FAMILY } from '@/constants/theme';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: AvatarSize;
}

export function Avatar({ uri, name, size = 'lg' }: AvatarProps) {
  const dimension = AVATAR_SIZE[size];
  const fontSize = dimension * 0.36;
  const iconSize = dimension * 0.5;
  const initials = name
    ? name
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: COLORS.neutral[200],
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
        backgroundColor: COLORS.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {initials ? (
        <Text
          style={{
            fontSize,
            fontFamily: FONT_FAMILY.bold,
            color: COLORS.primary[600],
          }}
        >
          {initials}
        </Text>
      ) : (
        <Ionicons name="person" size={iconSize} color={COLORS.primary[400]} />
      )}
    </View>
  );
}

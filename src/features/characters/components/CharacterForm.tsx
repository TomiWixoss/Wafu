import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '@/types/character';
import { Avatar } from '@/components/ui/Avatar';
import { COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, SPACING, RADII } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';

interface CharacterFormProps {
  character: Character;
  onChange: (field: string, value: string) => void;
}

export function CharacterForm({ character, onChange }: CharacterFormProps) {
  return (
    <View>
      {/* Avatar */}
      <View style={{ alignItems: 'center', marginBottom: SPACING['4xl'] }}>
        <Avatar uri={character.avatar} name={character.name} size="4xl" />
        <Text
          style={{
            fontFamily: FONT_FAMILY.bold,
            fontSize: FONT_SIZE['2xl'],
            color: COLORS.neutral[900],
            marginTop: SPACING.xl,
          }}
        >
          {character.card.data.name || STRINGS.characterName}
        </Text>
        {character.card.data.creator && (
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: FONT_SIZE.sm,
              color: COLORS.neutral[400],
              marginTop: SPACING.xs,
            }}
          >
            by {character.card.data.creator}
          </Text>
        )}
      </View>

      {/* Basic Info Section */}
      <SectionHeader icon="person-outline" title={STRINGS.basicInfo} />
      <FormField
        label={STRINGS.name}
        value={character.card.data.name}
        onChange={(text) => onChange('name', text)}
        placeholder={STRINGS.characterName}
      />

      <FormField
        label={STRINGS.description}
        value={character.card.data.description}
        onChange={(text) => onChange('description', text)}
        placeholder={STRINGS.characterDescription}
        multiline
        numberOfLines={4}
      />

      {/* Personality Section */}
      <SectionHeader icon="sparkles-outline" title={STRINGS.personalityAndScenario} />
      <FormField
        label={STRINGS.personality}
        value={character.card.data.personality}
        onChange={(text) => onChange('personality', text)}
        placeholder={STRINGS.characterPersonality}
        multiline
        numberOfLines={3}
      />

      <FormField
        label={STRINGS.scenario}
        value={character.card.data.scenario}
        onChange={(text) => onChange('scenario', text)}
        placeholder={STRINGS.characterScenario}
        multiline
        numberOfLines={3}
      />

      {/* Conversation Section */}
      <SectionHeader icon="chatbubbles-outline" title={STRINGS.conversation} />
      <FormField
        label={STRINGS.firstMessage}
        value={character.card.data.first_mes}
        onChange={(text) => onChange('first_mes', text)}
        placeholder={STRINGS.firstMessage}
        multiline
        numberOfLines={4}
      />
    </View>
  );
}

function SectionHeader({ icon, title }: { icon: keyof typeof Ionicons.glyphMap; title: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING['3xl'],
        marginBottom: SPACING.xl,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: COLORS.primary[100],
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: SPACING.lg,
        }}
      >
        <Ionicons name={icon} size={16} color={COLORS.primary[600]} />
      </View>
      <Text
        style={{
          fontFamily: FONT_FAMILY.semibold,
          fontSize: FONT_SIZE.lg,
          lineHeight: LINE_HEIGHT.lg,
          color: COLORS.neutral[900],
        }}
      >
        {title}
      </Text>
    </View>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
}

function FormField({ label, value, onChange, placeholder, multiline, numberOfLines }: FormFieldProps) {
  return (
    <View style={{ marginBottom: SPACING.xl }}>
      <Text
        style={{
          fontFamily: FONT_FAMILY.medium,
          fontSize: FONT_SIZE.sm,
          color: COLORS.neutral[600],
          marginBottom: SPACING.md,
        }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.neutral[400]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={{
          backgroundColor: COLORS.neutral[0],
          padding: SPACING.xl,
          borderRadius: RADII.xl,
          fontFamily: FONT_FAMILY.regular,
          fontSize: FONT_SIZE.base,
          color: COLORS.neutral[900],
          borderWidth: 1.5,
          borderColor: COLORS.neutral[200],
          ...(multiline && { textAlignVertical: 'top', minHeight: (numberOfLines || 3) * 24 }),
        }}
      />
    </View>
  );
}

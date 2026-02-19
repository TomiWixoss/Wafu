import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '@/types/character';

interface CharacterFormProps {
  character: Character;
  onChange: (field: string, value: string) => void;
}

export function CharacterForm({ character, onChange }: CharacterFormProps) {
  return (
    <View>
      {/* Avatar */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: `data:image/png;base64,${character.avatar}` }}
          className="w-32 h-32 rounded-full"
        />
      </View>

      {/* Name */}
      <FormField
        icon="person-outline"
        label="Name"
        value={character.card.data.name}
        onChange={(text) => onChange('name', text)}
        placeholder="Character name"
      />

      {/* Description */}
      <FormField
        icon="document-text-outline"
        label="Description"
        value={character.card.data.description}
        onChange={(text) => onChange('description', text)}
        placeholder="Character description"
        multiline
        numberOfLines={4}
      />

      {/* Personality */}
      <FormField
        icon="happy-outline"
        label="Personality"
        value={character.card.data.personality}
        onChange={(text) => onChange('personality', text)}
        placeholder="Character personality"
        multiline
        numberOfLines={3}
      />

      {/* Scenario */}
      <FormField
        icon="book-outline"
        label="Scenario"
        value={character.card.data.scenario}
        onChange={(text) => onChange('scenario', text)}
        placeholder="Character scenario"
        multiline
        numberOfLines={3}
      />

      {/* First Message */}
      <FormField
        icon="chatbubble-outline"
        label="First Message"
        value={character.card.data.first_mes}
        onChange={(text) => onChange('first_mes', text)}
        placeholder="First message"
        multiline
        numberOfLines={3}
      />
    </View>
  );
}

interface FormFieldProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
}

function FormField({ icon, label, value, onChange, placeholder, multiline, numberOfLines }: FormFieldProps) {
  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        <Ionicons name={icon} size={18} color="#6B7280" />
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
          {label}
        </Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChange}
        className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

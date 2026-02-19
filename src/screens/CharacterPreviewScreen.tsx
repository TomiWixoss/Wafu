import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { Character } from '../types/character';

export function CharacterPreviewScreen({ route, navigation }: any) {
  const { character: initialCharacter, isNew } = route.params;
  const { addCharacter, updateCharacter } = useStore();

  const [character, setCharacter] = useState<Character>(initialCharacter);

  const handleSave = async () => {
    try {
      if (isNew) {
        await addCharacter(character);
      } else {
        await updateCharacter({ ...character, updatedAt: Date.now() });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save character');
    }
  };

  const updateField = (field: string, value: string) => {
    setCharacter(prev => ({
      ...prev,
      card: {
        ...prev.card,
        data: {
          ...prev.card.data,
          [field]: value,
        },
      },
    }));
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="p-4">
        {/* Avatar */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: `data:image/png;base64,${character.avatar}` }}
            className="w-32 h-32 rounded-full"
          />
        </View>

        {/* Name */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="person-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              Name
            </Text>
          </View>
          <TextInput
            value={character.card.data.name}
            onChangeText={(text) => {
              updateField('name', text);
              setCharacter(prev => ({ ...prev, name: text }));
            }}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
            placeholder="Character name"
          />
        </View>

        {/* Description */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="document-text-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              Description
            </Text>
          </View>
          <TextInput
            value={character.card.data.description}
            onChangeText={(text) => updateField('description', text)}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
            placeholder="Character description"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Personality */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="happy-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              Personality
            </Text>
          </View>
          <TextInput
            value={character.card.data.personality}
            onChangeText={(text) => updateField('personality', text)}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
            placeholder="Character personality"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Scenario */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="book-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              Scenario
            </Text>
          </View>
          <TextInput
            value={character.card.data.scenario}
            onChangeText={(text) => updateField('scenario', text)}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
            placeholder="Character scenario"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* First Message */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="chatbubble-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              First Message
            </Text>
          </View>
          <TextInput
            value={character.card.data.first_mes}
            onChangeText={(text) => updateField('first_mes', text)}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
            placeholder="First message"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-blue-500 p-4 rounded-lg items-center mb-6 flex-row justify-center"
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
          <Text className="text-white font-semibold text-lg ml-2">
            {isNew ? 'Add Character' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

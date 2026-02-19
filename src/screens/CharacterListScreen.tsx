import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { parseCharacterCard } from '../utils/characterParser';
import { Character } from '../types/character';

export function CharacterListScreen({ navigation }: any) {
  const { characters, loadCharacters, addCharacter, deleteCharacter } = useStore();

  useEffect(() => {
    loadCharacters();
  }, []);

  const handleImportCharacter = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const { card, imageBase64 } = await parseCharacterCard(result.assets[0].uri);

        const character: Character = {
          id: Date.now().toString(),
          name: card.data.name,
          avatar: imageBase64,
          card,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        // Navigate to preview/edit screen
        navigation.navigate('CharacterPreview', { character, isNew: true });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to import character: ' + (error as Error).message);
    }
  };

  const handleCharacterPress = (character: Character) => {
    navigation.navigate('ChatList', { character });
  };

  const handleCharacterLongPress = (character: Character) => {
    Alert.alert(
      character.name,
      'What would you like to do?',
      [
        {
          text: 'Edit',
          onPress: () => navigation.navigate('CharacterPreview', { character, isNew: false }),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Delete Character',
              `Are you sure you want to delete ${character.name}?`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => deleteCharacter(character.id),
                },
              ]
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <TouchableOpacity
      onPress={() => handleCharacterPress(item)}
      onLongPress={() => handleCharacterLongPress(item)}
      className="flex-row items-center p-4 bg-white dark:bg-gray-800 rounded-lg mb-3 shadow"
    >
      <Image
        source={{ uri: `data:image/png;base64,${item.avatar}` }}
        className="w-16 h-16 rounded-full"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-gray-900 dark:text-white">
          {item.name}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400" numberOfLines={2}>
          {item.card.data.description || 'No description'}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Characters
        </Text>

        {characters.length === 0 ? (
          <View className="items-center justify-center flex-1">
            <Ionicons name="people-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 dark:text-gray-400 text-center mt-4 mb-2 text-lg">
              No characters yet
            </Text>
            <Text className="text-gray-400 dark:text-gray-500 text-center px-8">
              Import a character card to get started!
            </Text>
          </View>
        ) : (
          <FlatList
            data={characters}
            renderItem={renderCharacter}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        <TouchableOpacity
          onPress={handleImportCharacter}
          className="absolute bottom-6 right-6 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg"
          style={{ elevation: 5 }}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

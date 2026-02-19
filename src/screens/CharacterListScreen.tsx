import React, { useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useCharacters } from '@/features/characters/hooks/useCharacters';
import { useCharacterImport } from '@/features/characters/hooks/useCharacterImport';
import { CharacterCard } from '@/features/characters/components/CharacterCard';
import { EmptyCharacterList } from '@/features/characters/components/EmptyCharacterList';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { showDeleteConfirm } from '@/utils/alerts';
import { Character } from '@/types/character';

export function CharacterListScreen({ navigation }: any) {
  const { characters, loadCharacters, deleteCharacter } = useCharacters();
  const { importFromImage, isImporting, error } = useCharacterImport();

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Import Error', error);
    }
  }, [error]);

  const handleImport = async () => {
    const character = await importFromImage();
    if (character) {
      navigation.navigate('CharacterPreview', { character, isNew: true });
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
          onPress: () => showDeleteConfirm(character.name, () => deleteCharacter(character.id)),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Characters
        </Text>

        {characters.length === 0 ? (
          <EmptyCharacterList />
        ) : (
          <FlatList
            data={characters}
            renderItem={({ item }) => (
              <CharacterCard
                character={item}
                onPress={() => handleCharacterPress(item)}
                onLongPress={() => handleCharacterLongPress(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}

        <FloatingActionButton onPress={handleImport} />
      </View>
    </View>
  );
}

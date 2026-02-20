import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCharacters } from '@/features/characters/hooks/useCharacters';
import { useCharacterImport } from '@/features/characters/hooks/useCharacterImport';
import { CharacterCard } from '@/features/characters/components/CharacterCard';
import { EmptyCharacterList } from '@/features/characters/components/EmptyCharacterList';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { FloatingActionButton } from '@/components/ui/FloatingActionButton';
import { IconButton } from '@/components/ui/IconButton';
import { showDeleteConfirm } from '@/utils/alerts';
import { Character } from '@/types/character';
import { COLORS, SPACING } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';
import { useStore } from '@/store/useStore';

export function CharacterListScreen({ navigation }: any) {
  const { characters, loadCharacters, deleteCharacter } = useCharacters();
  const { importFromImage, isImporting, error } = useCharacterImport();
  const toggleFavorite = useStore(s => s.toggleFavorite);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadCharacters();
    }, [])
  );

  useEffect(() => {
    if (error) {
      Alert.alert(STRINGS.importError, error);
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
      STRINGS.whatToDo,
      [
        {
          text: character.isFavorite ? '☆ Bỏ ghim' : '★ Ghim',
          onPress: () => toggleFavorite(character.id),
        },
        {
          text: STRINGS.edit,
          onPress: () => navigation.navigate('CharacterPreview', { character, isNew: false }),
        },
        {
          text: STRINGS.delete,
          style: 'destructive',
          onPress: () => showDeleteConfirm(character.name, () => deleteCharacter(character.id)),
        },
        { text: STRINGS.cancel, style: 'cancel' },
      ]
    );
  };

  const filteredCharacters = characters.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.neutral[50] }}>
      <ScreenHeader title={STRINGS.characters} />

      <View style={{ flex: 1, paddingHorizontal: SPACING.xl }}>
        {/* Search */}
        <View style={{ marginTop: SPACING.xl, marginBottom: SPACING.lg }}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={STRINGS.searchCharacters}
          />
        </View>

        {filteredCharacters.length === 0 && searchQuery === '' ? (
          <EmptyCharacterList />
        ) : (
          <FlatList
            data={filteredCharacters}
            renderItem={({ item }) => (
              <CharacterCard
                character={item}
                onPress={() => handleCharacterPress(item)}
                onLongPress={() => handleCharacterLongPress(item)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <FloatingActionButton onPress={handleImport} />
      </View>
    </View>
  );
}

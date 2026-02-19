import React, { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { useCharacterActions } from '@/features/characters/hooks/useCharacters';
import { CharacterForm } from '@/features/characters/components/CharacterForm';
import { Button } from '@/components/ui/Button';
import { Character } from '@/types/character';
import { STRINGS } from '@/constants/strings';

export function CharacterPreviewScreen({ route, navigation }: any) {
  const { character: initialCharacter, isNew } = route.params;
  const { importCharacter, editCharacter } = useCharacterActions();
  const [character, setCharacter] = useState<Character>(initialCharacter);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isNew) {
        await importCharacter(character);
      } else {
        await editCharacter(character);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert(STRINGS.error, STRINGS.failedToSave);
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setCharacter(prev => ({
      ...prev,
      name: field === 'name' ? value : prev.name,
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
        <CharacterForm character={character} onChange={updateField} />
        
        <Button
          onPress={handleSave}
          title={isNew ? STRINGS.addCharacter : STRINGS.saveChanges}
          icon="checkmark-circle-outline"
          loading={isSaving}
        />
      </View>
    </ScrollView>
  );
}

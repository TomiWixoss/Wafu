import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { parseCharacterCard } from '@/utils/characterParser';
import { Character } from '@/types/character';

export function useCharacterImport() {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importFromImage = async (): Promise<Character | null> => {
    setIsImporting(true);
    setError(null);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled || !result.assets[0]) {
        return null;
      }

      const { card, imageBase64 } = await parseCharacterCard(result.assets[0].uri);

      const character: Character = {
        id: Date.now().toString(),
        name: card.data.name,
        avatar: imageBase64,
        card,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      return character;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to import character: ${message}`);
      return null;
    } finally {
      setIsImporting(false);
    }
  };

  return {
    importFromImage,
    isImporting,
    error,
  };
}

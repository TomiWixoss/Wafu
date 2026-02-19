import { useStore } from '@/store/useStore';
import { Character } from '@/types/character';

export function useCharacters() {
  const { 
    characters, 
    loadCharacters, 
    addCharacter, 
    updateCharacter, 
    deleteCharacter 
  } = useStore();

  return {
    characters,
    loadCharacters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
  };
}

export function useCharacterActions() {
  const { addCharacter, updateCharacter, deleteCharacter } = useStore();

  const importCharacter = async (character: Character) => {
    await addCharacter(character);
  };

  const editCharacter = async (character: Character) => {
    await updateCharacter({ ...character, updatedAt: Date.now() });
  };

  const removeCharacter = async (id: string) => {
    await deleteCharacter(id);
  };

  return {
    importCharacter,
    editCharacter,
    removeCharacter,
  };
}

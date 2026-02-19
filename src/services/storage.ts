import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { Character, Chat, AISettings } from '../types/character';

const KEYS = {
  CHARACTERS: '@characters',
  CHATS: '@chats',
  AI_SETTINGS: '@ai_settings',
};

const AVATAR_DIR = `${FileSystem.documentDirectory}avatars/`;

// Avatar file system helpers
async function ensureAvatarDir(): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(AVATAR_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(AVATAR_DIR, { intermediates: true });
  }
}

async function saveAvatar(characterId: string, base64: string): Promise<void> {
  await ensureAvatarDir();
  const filePath = `${AVATAR_DIR}${characterId}.png`;
  await FileSystem.writeAsStringAsync(filePath, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });
}

async function loadAvatar(characterId: string): Promise<string> {
  const filePath = `${AVATAR_DIR}${characterId}.png`;
  const fileInfo = await FileSystem.getInfoAsync(filePath);
  
  if (!fileInfo.exists) {
    return '';
  }
  
  const base64 = await FileSystem.readAsStringAsync(filePath, {
    encoding: FileSystem.EncodingType.Base64,
  });
  
  return `data:image/png;base64,${base64}`;
}

async function deleteAvatar(characterId: string): Promise<void> {
  const filePath = `${AVATAR_DIR}${characterId}.png`;
  const fileInfo = await FileSystem.getInfoAsync(filePath);
  
  if (fileInfo.exists) {
    await FileSystem.deleteAsync(filePath);
  }
}

// Characters
export async function saveCharacter(character: Character): Promise<void> {
  // Save avatar to file system if exists
  if (character.avatar) {
    // Extract base64 from data URL
    const base64 = character.avatar.replace(/^data:image\/\w+;base64,/, '');
    await saveAvatar(character.id, base64);
  }
  
  // Create character without avatar for AsyncStorage
  const characterWithoutAvatar = {
    ...character,
    avatar: '', // Remove avatar from AsyncStorage
  };
  
  const characters = await getCharactersWithoutAvatars();
  const index = characters.findIndex(c => c.id === character.id);
  
  if (index >= 0) {
    characters[index] = characterWithoutAvatar;
  } else {
    characters.push(characterWithoutAvatar);
  }
  
  const jsonString = JSON.stringify(characters);
  
  try {
    await AsyncStorage.setItem(KEYS.CHARACTERS, jsonString);
  } catch (error) {
    console.error('Error saving character:', error);
    throw error;
  }
}

// Helper to get characters without avatars (internal use)
async function getCharactersWithoutAvatars(): Promise<Character[]> {
  const data = await AsyncStorage.getItem(KEYS.CHARACTERS);
  return data ? JSON.parse(data) : [];
}

export async function getCharacters(): Promise<Character[]> {
  const characters = await getCharactersWithoutAvatars();
  
  // Load avatars from file system
  const charactersWithAvatars = await Promise.all(
    characters.map(async (character) => {
      const avatar = await loadAvatar(character.id);
      return {
        ...character,
        avatar,
      };
    })
  );
  
  return charactersWithAvatars;
}

export async function getCharacter(id: string): Promise<Character | null> {
  const characters = await getCharacters();
  return characters.find(c => c.id === id) || null;
}

export async function deleteCharacter(id: string): Promise<void> {
  // Delete avatar from file system
  await deleteAvatar(id);
  
  const characters = await getCharactersWithoutAvatars();
  const filtered = characters.filter(c => c.id !== id);
  await AsyncStorage.setItem(KEYS.CHARACTERS, JSON.stringify(filtered));
  
  // Also delete all chats for this character
  const chats = await getChats(id);
  for (const chat of chats) {
    await deleteChat(chat.id);
  }
}

// Chats
export async function saveChat(chat: Chat): Promise<void> {
  const chats = await getAllChats();
  const index = chats.findIndex(c => c.id === chat.id);
  
  if (index >= 0) {
    chats[index] = chat;
  } else {
    chats.push(chat);
  }
  
  await AsyncStorage.setItem(KEYS.CHATS, JSON.stringify(chats));
}

export async function getAllChats(): Promise<Chat[]> {
  const data = await AsyncStorage.getItem(KEYS.CHATS);
  return data ? JSON.parse(data) : [];
}

export async function getChats(characterId: string): Promise<Chat[]> {
  const allChats = await getAllChats();
  return allChats.filter(c => c.characterId === characterId);
}

export async function getChat(id: string): Promise<Chat | null> {
  const chats = await getAllChats();
  return chats.find(c => c.id === id) || null;
}

export async function deleteChat(id: string): Promise<void> {
  const chats = await getAllChats();
  const filtered = chats.filter(c => c.id !== id);
  await AsyncStorage.setItem(KEYS.CHATS, JSON.stringify(filtered));
}

// AI Settings
export async function saveAISettings(settings: AISettings): Promise<void> {
  await AsyncStorage.setItem(KEYS.AI_SETTINGS, JSON.stringify(settings));
}

export async function getAISettings(): Promise<AISettings> {
  const data = await AsyncStorage.getItem(KEYS.AI_SETTINGS);
  return data ? JSON.parse(data) : {
    apiKey: '',
    model: 'deepseek-ai/deepseek-v3.2',
    temperature: 1,
    topP: 0.95,
    maxTokens: 8192,
    enableThinking: true,
  };
}

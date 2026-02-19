import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character, Chat, AISettings } from '../types/character';

const KEYS = {
  CHARACTERS: '@characters',
  CHATS: '@chats',
  AI_SETTINGS: '@ai_settings',
};

// Characters
export async function saveCharacter(character: Character): Promise<void> {
  const characters = await getCharacters();
  const index = characters.findIndex(c => c.id === character.id);
  
  if (index >= 0) {
    characters[index] = character;
  } else {
    characters.push(character);
  }
  
  await AsyncStorage.setItem(KEYS.CHARACTERS, JSON.stringify(characters));
}

export async function getCharacters(): Promise<Character[]> {
  const data = await AsyncStorage.getItem(KEYS.CHARACTERS);
  return data ? JSON.parse(data) : [];
}

export async function getCharacter(id: string): Promise<Character | null> {
  const characters = await getCharacters();
  return characters.find(c => c.id === id) || null;
}

export async function deleteCharacter(id: string): Promise<void> {
  const characters = await getCharacters();
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

import { create } from 'zustand';
import { Character, Chat, AISettings } from '../types/character';
import * as storage from '../services/storage';

interface AppState {
  characters: Character[];
  currentCharacter: Character | null;
  currentChat: Chat | null;
  aiSettings: AISettings | null;
  
  // Actions
  loadCharacters: () => Promise<void>;
  addCharacter: (character: Character) => Promise<void>;
  updateCharacter: (character: Character) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;
  setCurrentCharacter: (character: Character | null) => void;
  
  loadChat: (chatId: string) => Promise<void>;
  createChat: (characterId: string) => Promise<Chat>;
  updateChat: (chat: Chat) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  setCurrentChat: (chat: Chat | null) => void;
  
  loadAISettings: () => Promise<void>;
  updateAISettings: (settings: AISettings) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  characters: [],
  currentCharacter: null,
  currentChat: null,
  aiSettings: null,

  loadCharacters: async () => {
    const characters = await storage.getCharacters();
    set({ characters });
  },

  addCharacter: async (character) => {
    await storage.saveCharacter(character);
    await get().loadCharacters();
  },

  updateCharacter: async (character) => {
    await storage.saveCharacter(character);
    await get().loadCharacters();
    
    // Update current character if it's the same one
    if (get().currentCharacter?.id === character.id) {
      set({ currentCharacter: character });
    }
  },

  deleteCharacter: async (id) => {
    await storage.deleteCharacter(id);
    await get().loadCharacters();
    
    // Clear current character if it was deleted
    if (get().currentCharacter?.id === id) {
      set({ currentCharacter: null, currentChat: null });
    }
  },

  setCurrentCharacter: (character) => {
    set({ currentCharacter: character });
  },

  loadChat: async (chatId) => {
    const chat = await storage.getChat(chatId);
    set({ currentChat: chat });
  },

  createChat: async (characterId) => {
    const character = await storage.getCharacter(characterId);
    if (!character) throw new Error('Character not found');

    const chat: Chat = {
      id: Date.now().toString(),
      characterId,
      messages: [
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: character.card.data.first_mes || 'Hello!',
          timestamp: Date.now(),
        },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      title: `Chat with ${character.name}`,
    };

    await storage.saveChat(chat);
    set({ currentChat: chat });
    return chat;
  },

  updateChat: async (chat) => {
    await storage.saveChat(chat);
    
    // Update current chat if it's the same one
    if (get().currentChat?.id === chat.id) {
      set({ currentChat: chat });
    }
  },

  deleteChat: async (chatId) => {
    await storage.deleteChat(chatId);
    
    // Clear current chat if it was deleted
    if (get().currentChat?.id === chatId) {
      set({ currentChat: null });
    }
  },

  setCurrentChat: (chat) => {
    set({ currentChat: chat });
  },

  loadAISettings: async () => {
    const aiSettings = await storage.getAISettings();
    set({ aiSettings });
  },

  updateAISettings: async (settings) => {
    await storage.saveAISettings(settings);
    set({ aiSettings: settings });
  },
}));

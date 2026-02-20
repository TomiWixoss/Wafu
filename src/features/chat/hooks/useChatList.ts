import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Chat, Character } from '@/types/character';
import * as storage from '@/services/storage';

export function useChatList(character: Character) {
  const { createChat, deleteChat, setCurrentCharacter, setCurrentChat } = useStore();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentCharacter(character);
    loadChats();
  }, [character]);

  const loadChats = async () => {
    setIsLoading(true);
    try {
      const characterChats = await storage.getChats(character.id);
      setChats(characterChats.sort((a, b) => b.updatedAt - a.updatedAt));
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = async (greeting?: string) => {
    try {
      const chat = await createChat(character.id, greeting);
      setCurrentChat(chat);
      return chat;
    } catch (error) {
      throw new Error('Failed to create chat');
    }
  };

  const removeChat = async (chatId: string) => {
    await deleteChat(chatId);
    await loadChats();
  };

  return {
    chats,
    isLoading,
    createNewChat,
    removeChat,
    setCurrentChat,
  };
}

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Chat, ChatMessage, Character } from '@/types/character';
import { streamChat } from '@/services/ai';
import { STRINGS } from '@/constants/strings';

export function useChat(initialChat: Chat, character: Character) {
  const { updateChat, aiSettings, loadAISettings, deleteMessage: storeDeleteMessage } = useStore();
  const [chat, setChat] = useState<Chat>(initialChat);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadAISettings();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isGenerating) {
      return { success: false, error: STRINGS.invalidInput };
    }
    
    if (!aiSettings?.apiKey) {
      return { success: false, error: STRINGS.apiKeyRequired };
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    const updatedChat = {
      ...chat,
      messages: [...chat.messages, userMessage],
      updatedAt: Date.now(),
    };

    setChat(updatedChat);
    setInput('');
    setIsGenerating(true);

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setChat(prev => ({
      ...prev,
      messages: [...prev.messages, assistantMessage],
    }));

    try {
      let fullContent = '';
      let fullReasoning = '';

      for await (const chunk of streamChat(updatedChat.messages, character.card, aiSettings)) {
        if (chunk.content) fullContent += chunk.content;
        if (chunk.reasoning) fullReasoning += chunk.reasoning;

        setChat(prev => ({
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === assistantMessage.id
              ? { ...msg, content: fullContent, reasoning: fullReasoning }
              : msg
          ),
        }));
      }

      const finalChat = {
        ...updatedChat,
        messages: [
          ...updatedChat.messages,
          { ...assistantMessage, content: fullContent, reasoning: fullReasoning },
        ],
        updatedAt: Date.now(),
      };

      await updateChat(finalChat);
      setChat(finalChat);

      return { success: true };
    } catch (error) {
      setChat(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => msg.id !== assistantMessage.id),
      }));

      return { 
        success: false, 
        error: error instanceof Error ? error.message : STRINGS.failedToGenerate 
      };
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    await storeDeleteMessage(chat.id, messageId);
    setChat(prev => ({
      ...prev,
      messages: prev.messages.map(msg =>
        msg.id === messageId ? { ...msg, isDeleted: true, content: '' } : msg
      ),
    }));
  };

  return {
    chat,
    input,
    setInput,
    isGenerating,
    sendMessage,
    deleteMessage,
  };
}

export interface CharacterCard {
  spec: string;
  spec_version: string;
  data: {
    name: string;
    description: string;
    personality: string;
    scenario: string;
    first_mes: string;
    mes_example: string;
    creator_notes?: string;
    system_prompt?: string;
    post_history_instructions?: string;
    alternate_greetings?: string[];
    character_book?: any;
    tags?: string[];
    creator?: string;
    character_version?: string;
    extensions?: Record<string, any>;
  };
}

export interface Character {
  id: string;
  name: string;
  avatar: string; // base64 image
  card: CharacterCard;
  createdAt: number;
  updatedAt: number;
  isFavorite?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  reasoning?: string;
  isDeleted?: boolean;
}

export interface Chat {
  id: string;
  characterId: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  title: string;
}

export interface AISettings {
  apiKey: string;
  model: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  enableThinking: boolean;
}

import { fetch } from 'expo/fetch';
import OpenAI from 'openai';
import { AISettings, ChatMessage, CharacterCard } from '../types/character';

export interface StreamChunk {
  content?: string;
  reasoning?: string;
  done: boolean;
}

export async function* streamChat(
  messages: ChatMessage[],
  character: CharacterCard,
  settings: AISettings,
): AsyncGenerator<StreamChunk> {
  if (!settings.apiKey) {
    throw new Error('API key not configured');
  }

  // Initialize OpenAI client with NVIDIA endpoint and expo/fetch
  const openai = new OpenAI({
    apiKey: settings.apiKey,
    baseURL: 'https://integrate.api.nvidia.com/v1',
    fetch: fetch as any, // Use expo/fetch for streaming support
  });

  // Build system prompt
  const systemPrompt = buildSystemPrompt(character);

  // Convert messages to OpenAI format
  const apiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => {
      const msg: OpenAI.Chat.ChatCompletionMessageParam = {
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      };
      
      // Include reasoning_content for assistant messages if available
      if (m.role === 'assistant' && m.reasoning) {
        (msg as any).reasoning_content = m.reasoning;
      }
      
      return msg;
    }),
  ];

  try {
    const stream = await openai.chat.completions.create({
      model: settings.model,
      messages: apiMessages,
      temperature: settings.temperature,
      top_p: settings.topP,
      max_tokens: settings.maxTokens,
      stream: true,
      // Enable thinking mode for DeepSeek and Step models
      ...(settings.enableThinking && (settings.model.includes('deepseek') || settings.model.includes('step')) && {
        // @ts-ignore - NVIDIA API specific parameter
        chat_template_kwargs: { thinking: true },
      }),
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;
      
      if (delta) {
        yield {
          content: delta.content || undefined,
          // @ts-ignore - reasoning_content is NVIDIA/DeepSeek specific
          reasoning: delta.reasoning_content || undefined,
          done: false,
        };
      }
    }

    yield { done: true };
  } catch (error) {
    console.error('Stream error:', error);
    throw error;
  }
}

function buildSystemPrompt(character: CharacterCard): string {
  const parts: string[] = [];

  // System prompt
  if (character.data.system_prompt) {
    parts.push(character.data.system_prompt);
  }

  // Character description
  parts.push(`You are ${character.data.name}.`);
  
  if (character.data.description) {
    parts.push(`Description: ${character.data.description}`);
  }

  if (character.data.personality) {
    parts.push(`Personality: ${character.data.personality}`);
  }

  if (character.data.scenario) {
    parts.push(`Scenario: ${character.data.scenario}`);
  }

  // Example dialogue
  if (character.data.mes_example) {
    parts.push(`Example dialogue:\n${character.data.mes_example}`);
  }

  // Post history instructions
  if (character.data.post_history_instructions) {
    parts.push(character.data.post_history_instructions);
  }

  // Creator notes
  if (character.data.creator_notes) {
    parts.push(`Creator notes: ${character.data.creator_notes}`);
  }

  return parts.join('\n\n');
}

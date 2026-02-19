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

  // Build system prompt
  const systemPrompt = buildSystemPrompt(character);

  // Convert messages to OpenAI format
  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
  ];

  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.model,
      messages: apiMessages,
      temperature: settings.temperature,
      top_p: settings.topP,
      max_tokens: settings.maxTokens,
      stream: true,
      ...(settings.enableThinking && {
        chat_template_kwargs: { thinking: true },
      }),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        yield { done: true };
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            yield { done: true };
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;

            if (delta) {
              yield {
                content: delta.content || undefined,
                reasoning: delta.reasoning_content || undefined,
                done: false,
              };
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

function buildSystemPrompt(character: CharacterCard): string {
  const parts: string[] = [];

  // System prompt
  if (character.data.system_prompt) {
    parts.push(character.data.system_prompt);
  }

  // Character description
  parts.push(`Character: ${character.data.name}`);
  
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

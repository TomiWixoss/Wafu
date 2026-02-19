import * as FileSystem from 'expo-file-system';
// @ts-ignore - No types available
import extract from 'png-chunks-extract';
// @ts-ignore - No types available
import text from 'png-chunk-text';
import { CharacterCard } from '../types/character';

/**
 * Parse character card from PNG image
 */
export async function parseCharacterCard(uri: string): Promise<{
  card: CharacterCard;
  imageBase64: string;
}> {
  try {
    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64' as any,
    });

    // Convert base64 to buffer
    const buffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

    // Extract PNG chunks
    const chunks = extract(buffer);

    // Find text chunks
    const textChunks = chunks
      .filter((chunk: any) => chunk.name === 'tEXt')
      .map((chunk: any) => text.decode(chunk.data));

    // Look for chara or ccv3 chunk
    let cardData: CharacterCard | null = null;

    for (const chunk of textChunks) {
      if (chunk.keyword.toLowerCase() === 'chara') {
        const decoded = atob(chunk.text);
        cardData = JSON.parse(decoded);
        break;
      }
      if (chunk.keyword.toLowerCase() === 'ccv3') {
        const decoded = atob(chunk.text);
        cardData = JSON.parse(decoded);
        break;
      }
    }

    if (!cardData) {
      throw new Error('No character data found in PNG');
    }

    // Normalize to V2 format if needed
    if (!cardData.spec || cardData.spec === 'chara_card_v2') {
      cardData = normalizeToV2(cardData);
    }

    return {
      card: cardData,
      imageBase64: base64,
    };
  } catch (error) {
    console.error('Error parsing character card:', error);
    throw new Error('Failed to parse character card: ' + (error as Error).message);
  }
}

function normalizeToV2(card: any): CharacterCard {
  // If already V2 format
  if (card.spec === 'chara_card_v2' && card.data) {
    return card;
  }

  // Convert V1 to V2
  return {
    spec: 'chara_card_v2',
    spec_version: '2.0',
    data: {
      name: card.name || '',
      description: card.description || '',
      personality: card.personality || '',
      scenario: card.scenario || '',
      first_mes: card.first_mes || '',
      mes_example: card.mes_example || '',
      creator_notes: card.creator_notes || card.creatorcomment || '',
      system_prompt: card.system_prompt || '',
      post_history_instructions: card.post_history_instructions || '',
      alternate_greetings: card.alternate_greetings || [],
      character_book: card.character_book,
      tags: card.tags || [],
      creator: card.creator || '',
      character_version: card.character_version || '',
      extensions: card.extensions || {},
    },
  };
}

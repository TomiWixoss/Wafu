import * as FileSystem from 'expo-file-system/legacy';
// @ts-ignore - No types available
import extract from 'png-chunks-extract';
// @ts-ignore - No types available
import text from 'png-chunk-text';
import { CharacterCard } from '../types/character';
import { cleanText } from './cleanText';

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
      encoding: 'base64',
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
    let cardData: any = null;

    for (const chunk of textChunks) {
      const keyword = chunk.keyword.toLowerCase();
      
      if (keyword === 'chara' || keyword === 'ccv3') {
        const decoded = atob(chunk.text);
        cardData = JSON.parse(decoded);
        break;
      }
    }

    if (!cardData) {
      throw new Error('No character data found in PNG');
    }

    // Normalize to V2 format
    if (cardData.spec === 'chara_card_v3') {
      cardData = convertV3toV2(cardData);
    } else if (!cardData.spec || cardData.spec === 'chara_card_v2') {
      cardData = normalizeToV2(cardData);
    }

    return {
      card: cardData,
      imageBase64: `data:image/png;base64,${base64}`,
    };
  } catch (error) {
    console.error('=== ERROR PARSING CHARACTER ===');
    console.error('Error:', error);
    throw new Error('Failed to parse character card: ' + (error as Error).message);
  }
}

function convertV3toV2(cardV3: any): CharacterCard {
  return {
    spec: 'chara_card_v2',
    spec_version: '2.0',
    data: {
      name: cleanText(cardV3.data?.name),
      description: cleanText(cardV3.data?.description),
      personality: cleanText(cardV3.data?.personality),
      scenario: cleanText(cardV3.data?.scenario),
      first_mes: cleanText(cardV3.data?.first_mes),
      mes_example: cleanText(cardV3.data?.mes_example),
      creator_notes: cleanText(cardV3.data?.creator_notes),
      system_prompt: cleanText(cardV3.data?.system_prompt),
      post_history_instructions: cleanText(cardV3.data?.post_history_instructions),
      alternate_greetings: cardV3.data?.alternate_greetings || [],
      character_book: cardV3.data?.character_book,
      tags: cardV3.data?.tags || [],
      creator: cleanText(cardV3.data?.creator),
      character_version: cleanText(cardV3.data?.character_version),
      extensions: cardV3.data?.extensions || {},
    },
  };
}

function normalizeToV2(card: any): CharacterCard {
  // If already V2 format
  if (card.spec === 'chara_card_v2' && card.data) {
    return {
      ...card,
      data: {
        ...card.data,
        name: cleanText(card.data.name),
        description: cleanText(card.data.description),
        personality: cleanText(card.data.personality),
        scenario: cleanText(card.data.scenario),
        first_mes: cleanText(card.data.first_mes),
        mes_example: cleanText(card.data.mes_example),
        creator_notes: cleanText(card.data.creator_notes),
        system_prompt: cleanText(card.data.system_prompt),
        post_history_instructions: cleanText(card.data.post_history_instructions),
        creator: cleanText(card.data.creator),
        character_version: cleanText(card.data.character_version),
      },
    };
  }

  // Convert V1 to V2
  return {
    spec: 'chara_card_v2',
    spec_version: '2.0',
    data: {
      name: cleanText(card.name),
      description: cleanText(card.description),
      personality: cleanText(card.personality),
      scenario: cleanText(card.scenario),
      first_mes: cleanText(card.first_mes),
      mes_example: cleanText(card.mes_example),
      creator_notes: cleanText(card.creator_notes || card.creatorcomment),
      system_prompt: cleanText(card.system_prompt),
      post_history_instructions: cleanText(card.post_history_instructions),
      alternate_greetings: card.alternate_greetings || [],
      character_book: card.character_book,
      tags: card.tags || [],
      creator: cleanText(card.creator),
      character_version: cleanText(card.character_version),
      extensions: card.extensions || {},
    },
  };
}

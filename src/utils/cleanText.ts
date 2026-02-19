/**
 * Clean text by removing emojis, special characters, and control characters
 * that React Native TextInput cannot render properly
 */
export function cleanText(text: string | undefined): string {
  if (!text) return '';
  
  return text
    // Remove control characters
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    // Remove replacement characters
    .replace(/[\uFFFD\uFFFE\uFFFF]/g, '')
    // Remove zero-width characters
    .replace(/\uFEFF/g, '')
    // Remove emojis and symbols
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Misc Symbols
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // Flags
    .replace(/[\u{2600}-\u{26FF}]/gu, '')   // Misc symbols
    .replace(/[\u{2700}-\u{27BF}]/gu, '')   // Dingbats
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental
    .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '') // Chess
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // Extended-A
    // Replace smart quotes and dashes with regular ones
    .replace(/[\u2018\u2019]/g, "'")  // Smart single quotes
    .replace(/[\u201C\u201D]/g, '"')  // Smart double quotes
    .replace(/[\u2013\u2014]/g, '-')  // En dash, em dash
    .replace(/\u2026/g, '...')        // Ellipsis
    // Keep only ASCII printable + newlines/tabs
    .replace(/[^\x20-\x7E\n\r\t]/g, '')
    .trim();
}

export const AI_MODELS = [
  { 
    value: 'deepseek-ai/deepseek-v3.2', 
    label: 'DeepSeek V3.2', 
    description: 'Mô hình mới nhất với chế độ suy nghĩ',
    recommended: true,
  },
  { 
    value: 'deepseek-ai/deepseek-v3', 
    label: 'DeepSeek V3',
    description: 'Thế hệ trước',
  },
  { 
    value: 'meta/llama-3.1-405b-instruct', 
    label: 'Llama 3.1 405B',
    description: 'Mô hình Llama lớn nhất',
  },
  { 
    value: 'meta/llama-3.1-70b-instruct', 
    label: 'Llama 3.1 70B',
    description: 'Hiệu suất cân bằng',
  },
  { 
    value: 'meta/llama-3.1-8b-instruct', 
    label: 'Llama 3.1 8B',
    description: 'Nhanh và hiệu quả',
  },
] as const;

export const DEFAULT_MODEL = 'deepseek-ai/deepseek-v3.2';

export const DEFAULT_AI_SETTINGS = {
  apiKey: '',
  model: DEFAULT_MODEL,
  temperature: 1,
  topP: 0.95,
  maxTokens: 8192,
  enableThinking: true,
} as const;

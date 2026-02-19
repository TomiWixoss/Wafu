# Character AI Chat App

Ứng dụng chat với AI characters sử dụng Character Card format và NVIDIA API (DeepSeek V3.2).

## Tính năng

✅ Import character từ PNG (Character Card V2/V3 format)  
✅ Quản lý danh sách characters với UI đẹp  
✅ Edit thông tin character  
✅ Chat với AI sử dụng OpenAI SDK + NVIDIA endpoint  
✅ Streaming responses real-time  
✅ Thinking mode (hiển thị quá trình suy nghĩ của DeepSeek)  
✅ Markdown rendering trong chat  
✅ Lưu lịch sử chat local  
✅ Quản lý nhiều cuộc hội thoại  
✅ Xóa chat/character  
✅ Cấu hình AI settings (model, temperature, top_p, max_tokens)  
✅ Icons framework (@expo/vector-icons)

## Cài đặt

```bash
# Cài dependencies
bun install

# Chạy app
bun start

# Chạy trên Android
bun run android

# Chạy trên iOS
bun run ios
```

## Cấu hình

1. Mở tab **Settings** (icon bánh răng)
2. Nhập **NVIDIA API Key** (lấy từ https://build.nvidia.com)
3. Chọn **Model** (DeepSeek V3.2 recommended)
4. Điều chỉnh các tham số AI:
   - **Temperature**: 0-2 (cao hơn = ngẫu nhiên hơn)
   - **Top P**: 0-1 (nucleus sampling)
   - **Max Tokens**: 1-32000 (độ dài response)
   - **Thinking Mode**: Bật/tắt (chỉ cho DeepSeek)
5. Nhấn **Save Settings**

## Sử dụng

### Import Character

1. Nhấn nút **+** ở màn hình Characters
2. Chọn file PNG chứa character card
3. Preview và edit thông tin nếu cần
4. Nhấn **Add Character**

### Chat với Character

1. Chọn character từ danh sách
2. Nhấn **+** để tạo chat mới hoặc chọn chat có sẵn
3. Gõ tin nhắn và nhấn gửi (icon máy bay)
4. AI sẽ trả lời theo personality của character
5. Nếu bật Thinking Mode, bạn sẽ thấy quá trình suy nghĩ của AI

### Quản lý

- **Long press** character để edit hoặc xóa
- **Long press** chat để xóa
- Tất cả dữ liệu được lưu local trên thiết bị

## Công nghệ

### Core
- **React Native 0.81.5** + **Expo 54**
- **TypeScript** - Type safety
- **NativeWind** - Tailwind CSS cho React Native
- **Zustand** - State management

### Navigation
- **React Navigation** - Native stack + bottom tabs
- **React Native Gesture Handler** - Smooth gestures

### AI Integration
- **OpenAI SDK** - Tương thích với NVIDIA API
- **NVIDIA API** - Endpoint cho DeepSeek và Llama models
- **Streaming** - Real-time responses

### UI/UX
- **@expo/vector-icons** - Ionicons
- **react-native-markdown-display** - Markdown rendering
- **expo-image** - Optimized images
- **expo-image-picker** - Import character cards

### Storage
- **AsyncStorage** - Local data persistence
- **expo-file-system** - File operations

## Cấu trúc thư mục

```
src/
├── screens/          # Các màn hình
│   ├── CharacterListScreen.tsx      # Danh sách characters
│   ├── CharacterPreviewScreen.tsx   # Preview/Edit character
│   ├── ChatListScreen.tsx           # Danh sách chats
│   ├── ChatScreen.tsx               # Màn hình chat
│   └── SettingsScreen.tsx           # Cấu hình AI
├── services/         # Services
│   ├── ai.ts        # OpenAI SDK + NVIDIA API
│   └── storage.ts   # AsyncStorage helpers
├── store/           # State management
│   └── useStore.ts  # Zustand store
├── types/           # TypeScript types
│   └── character.ts # Character, Chat, AISettings types
└── utils/           # Utilities
    └── characterParser.ts  # Parse PNG character cards
```

## Character Card Format

App hỗ trợ Character Card V2 và V3:
- **Spec V2**: `chara_card_v2`
- **Spec V3**: `chara_card_v3`

Character cards được nhúng trong PNG metadata (tEXt chunks: `chara` hoặc `ccv3`).

## NVIDIA API

### Endpoint
```
https://integrate.api.nvidia.com/v1
```

### Models hỗ trợ
- **deepseek-ai/deepseek-v3.2** (Recommended)
- **deepseek-ai/deepseek-v3**
- **meta/llama-3.1-405b-instruct**
- **meta/llama-3.1-70b-instruct**
- **meta/llama-3.1-8b-instruct**

### Thinking Mode
DeepSeek models hỗ trợ thinking mode:
- Hiển thị quá trình suy nghĩ (reasoning_content)
- Cải thiện độ chính xác của response
- Tốn nhiều tokens hơn

### Streaming
Tất cả responses đều streaming real-time để UX tốt hơn.

## License

MIT


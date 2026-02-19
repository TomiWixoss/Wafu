# Character AI Chat App

Ứng dụng chat với AI characters sử dụng Character Card format (tương tự SillyTavern).

## Tính năng

- ✅ Import character từ PNG (Character Card V2/V3 format)
- ✅ Quản lý danh sách characters
- ✅ Edit thông tin character
- ✅ Chat với AI sử dụng NVIDIA API (DeepSeek, Llama, v.v.)
- ✅ Lưu lịch sử chat
- ✅ Quản lý nhiều cuộc hội thoại
- ✅ Xóa chat/character
- ✅ Cấu hình AI settings (model, temperature, top_p, max_tokens)
- ✅ Thinking mode (hiển thị quá trình suy nghĩ của AI)
- ✅ Streaming responses

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

1. Mở tab **Settings**
2. Nhập **NVIDIA API Key** (lấy từ https://build.nvidia.com)
3. Chọn **Model** (DeepSeek V3, Llama 3.1, v.v.)
4. Điều chỉnh các tham số AI theo ý muốn
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
3. Gõ tin nhắn và nhấn gửi
4. AI sẽ trả lời theo personality của character

### Quản lý

- **Long press** character để edit hoặc xóa
- **Long press** chat để xóa
- Tất cả dữ liệu được lưu local trên thiết bị

## Cấu trúc thư mục

```
src/
├── screens/          # Các màn hình
│   ├── CharacterListScreen.tsx
│   ├── CharacterPreviewScreen.tsx
│   ├── ChatListScreen.tsx
│   ├── ChatScreen.tsx
│   └── SettingsScreen.tsx
├── services/         # Services
│   ├── ai.ts        # NVIDIA API integration
│   └── storage.ts   # AsyncStorage helpers
├── store/           # State management (Zustand)
│   └── useStore.ts
├── types/           # TypeScript types
│   └── character.ts
└── utils/           # Utilities
    └── characterParser.ts  # Parse PNG character cards
```

## Character Card Format

App hỗ trợ Character Card V2 và V3 format:
- Spec V2: `chara_card_v2`
- Spec V3: `chara_card_v3`

Character cards được nhúng trong PNG metadata (tEXt chunks).

## API

Sử dụng NVIDIA API endpoint:
- Base URL: `https://integrate.api.nvidia.com/v1`
- Models: DeepSeek V3, Llama 3.1, và nhiều models khác
- Streaming: Hỗ trợ streaming responses

## License

MIT

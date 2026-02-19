# Architecture Documentation

## Cấu trúc thư mục

```
src/
├── components/           # Shared UI components
│   └── ui/              # Reusable UI components
│       ├── Button.tsx
│       ├── EmptyState.tsx
│       └── FloatingActionButton.tsx
│
├── features/            # Feature-based modules
│   ├── characters/      # Character management
│   │   ├── components/  # Character-specific components
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── CharacterForm.tsx
│   │   │   └── EmptyCharacterList.tsx
│   │   └── hooks/       # Character-specific hooks
│   │       ├── useCharacters.ts
│   │       └── useCharacterImport.ts
│   │
│   ├── chat/            # Chat functionality
│   │   ├── components/  # Chat-specific components
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── ChatListItem.tsx
│   │   └── hooks/       # Chat-specific hooks
│   │       ├── useChat.ts
│   │       └── useChatList.ts
│   │
│   └── settings/        # Settings management
│       ├── components/  # Settings-specific components
│       │   ├── ModelSelector.tsx
│       │   └── ParameterSlider.tsx
│       └── hooks/       # Settings-specific hooks
│           └── useSettings.ts
│
├── screens/             # Screen components (thin layer)
│   ├── CharacterListScreen.tsx
│   ├── CharacterPreviewScreen.tsx
│   ├── ChatListScreen.tsx
│   ├── ChatScreen.tsx
│   └── SettingsScreen.tsx
│
├── services/            # External services
│   ├── ai.ts           # OpenAI SDK + NVIDIA API
│   └── storage.ts      # AsyncStorage operations
│
├── store/              # Global state management
│   └── useStore.ts     # Zustand store
│
├── types/              # TypeScript type definitions
│   └── character.ts
│
├── utils/              # Utility functions
│   ├── alerts.ts       # Alert helpers
│   ├── characterParser.ts  # PNG parser
│   └── date.ts         # Date formatting
│
└── constants/          # App constants
    └── models.ts       # AI model definitions
```

## Nguyên tắc thiết kế

### 1. Separation of Concerns
- **Screens**: Chỉ chứa layout và điều hướng
- **Hooks**: Chứa toàn bộ business logic
- **Components**: Chỉ chứa UI, nhận props và render
- **Services**: Xử lý external API và storage

### 2. Feature-based Organization
Mỗi feature có cấu trúc riêng:
```
feature/
├── components/  # UI components cho feature này
├── hooks/       # Business logic hooks
└── types/       # Types riêng (nếu cần)
```

### 3. Single Responsibility
- Mỗi file chỉ làm 1 việc
- Mỗi component chỉ render 1 thứ
- Mỗi hook chỉ quản lý 1 logic

### 4. Reusability
- Shared components trong `components/ui/`
- Feature-specific components trong `features/*/components/`
- Utilities trong `utils/`

## Data Flow

```
Screen → Hook → Service → API/Storage
  ↓       ↓
Component ← Props
```

### Example: Sending a message

```typescript
// 1. Screen calls hook
const { sendMessage } = useChat(chat, character);

// 2. Hook processes logic
const sendMessage = async () => {
  // Validate, update state
  for await (const chunk of streamChat(...)) {
    // Update UI in real-time
  }
  // Save to storage
};

// 3. Service calls API
export async function* streamChat(...) {
  const openai = new OpenAI(...);
  const stream = await openai.chat.completions.create(...);
  // Stream chunks
}
```

## State Management

### Local State (useState)
- Component UI state
- Form inputs
- Temporary data

### Global State (Zustand)
- Characters list
- Current character/chat
- AI settings

### Persistent State (AsyncStorage)
- All characters
- All chats
- Settings

## Key Technologies

### Core
- **React Native 0.81.5** + **Expo 54**
- **TypeScript** - Type safety
- **NativeWind** - Tailwind CSS

### State & Data
- **Zustand** - Global state
- **AsyncStorage** - Persistence
- **React Hook Form** - Forms (ready to use)
- **Zod** - Validation (ready to use)

### UI/UX
- **@expo/vector-icons** - Icons
- **react-native-markdown-display** - Markdown
- **date-fns** - Date formatting
- **clsx** - Conditional classes

### AI Integration
- **OpenAI SDK** - API client
- **NVIDIA API** - Endpoint

## Best Practices

### 1. Hooks
```typescript
// ✅ Good: Separated logic
export function useCharacters() {
  const { characters, loadCharacters } = useStore();
  return { characters, loadCharacters };
}

// ❌ Bad: Mixed with UI
function CharacterList() {
  const [chars, setChars] = useState([]);
  useEffect(() => { /* load logic */ }, []);
  return <View>...</View>;
}
```

### 2. Components
```typescript
// ✅ Good: Pure UI component
export function Button({ onPress, title, icon }) {
  return <TouchableOpacity onPress={onPress}>...</TouchableOpacity>;
}

// ❌ Bad: Logic in component
export function Button({ onPress }) {
  const [loading, setLoading] = useState(false);
  const handlePress = async () => {
    setLoading(true);
    await someApiCall();
    setLoading(false);
  };
  return <TouchableOpacity onPress={handlePress}>...</TouchableOpacity>;
}
```

### 3. Services
```typescript
// ✅ Good: Pure service function
export async function saveCharacter(character: Character) {
  await AsyncStorage.setItem(key, JSON.stringify(character));
}

// ❌ Bad: Mixed with UI logic
export async function saveCharacter(character: Character, onSuccess: () => void) {
  await AsyncStorage.setItem(key, JSON.stringify(character));
  Alert.alert('Success');
  onSuccess();
}
```

## Adding New Features

### 1. Create feature folder
```
src/features/new-feature/
├── components/
├── hooks/
└── types/ (optional)
```

### 2. Create hook for logic
```typescript
// src/features/new-feature/hooks/useNewFeature.ts
export function useNewFeature() {
  // All business logic here
  return { data, actions };
}
```

### 3. Create components for UI
```typescript
// src/features/new-feature/components/FeatureCard.tsx
export function FeatureCard({ data, onPress }) {
  // Pure UI only
  return <View>...</View>;
}
```

### 4. Create screen
```typescript
// src/screens/NewFeatureScreen.tsx
export function NewFeatureScreen() {
  const { data, actions } = useNewFeature();
  return <FeatureCard data={data} onPress={actions.doSomething} />;
}
```

## Testing Strategy

### Unit Tests
- Hooks: Test logic in isolation
- Utils: Test pure functions
- Services: Mock API calls

### Integration Tests
- Screens: Test user flows
- Features: Test complete workflows

### E2E Tests
- Critical paths: Import → Chat → Save

## Performance Optimization

### 1. Memoization
```typescript
const MemoizedComponent = React.memo(Component);
const memoizedValue = useMemo(() => compute(), [deps]);
const memoizedCallback = useCallback(() => {}, [deps]);
```

### 2. Lazy Loading
```typescript
const LazyScreen = React.lazy(() => import('./Screen'));
```

### 3. Virtualization
```typescript
<FlatList
  data={items}
  renderItem={renderItem}
  removeClippedSubviews
  maxToRenderPerBatch={10}
/>
```

## Security

### 1. API Keys
- Never commit API keys
- Store in AsyncStorage
- Use environment variables for defaults

### 2. Data Validation
- Validate all inputs with Zod
- Sanitize user content
- Validate character cards before import

### 3. Error Handling
- Try-catch all async operations
- Show user-friendly error messages
- Log errors for debugging

## Deployment

### Development
```bash
bun start
```

### Production Build
```bash
bun run android  # Android
bun run ios      # iOS
```

### Pre-deployment Checklist
- [ ] Remove console.logs
- [ ] Test on real devices
- [ ] Check bundle size
- [ ] Verify API key handling
- [ ] Test offline functionality

export const STRINGS = {
  // Common
  save: 'Lưu',
  cancel: 'Hủy',
  delete: 'Xóa',
  edit: 'Sửa',
  confirm: 'Xác nhận',
  loading: 'Đang tải...',
  error: 'Lỗi',
  success: 'Thành công',
  
  // Characters
  characters: 'Nhân vật',
  noCharacters: 'Chưa có nhân vật',
  noCharactersDesc: 'Nhập ảnh character card để bắt đầu!',
  addCharacter: 'Thêm nhân vật',
  editCharacter: 'Sửa nhân vật',
  deleteCharacter: 'Xóa nhân vật',
  deleteCharacterConfirm: 'Bạn có chắc muốn xóa nhân vật này?',
  importCharacter: 'Nhập nhân vật',
  importError: 'Lỗi nhập nhân vật',
  importSuccess: 'Nhập nhân vật thành công',
  
  // Character Form
  name: 'Tên',
  description: 'Mô tả',
  personality: 'Tính cách',
  scenario: 'Kịch bản',
  firstMessage: 'Tin nhắn đầu tiên',
  characterName: 'Tên nhân vật',
  characterDescription: 'Mô tả nhân vật',
  characterPersonality: 'Tính cách nhân vật',
  characterScenario: 'Kịch bản nhân vật',
  noDescription: 'Không có mô tả',
  
  // Chat
  chats: 'Cuộc trò chuyện',
  chatsWith: 'Trò chuyện với',
  noChats: 'Chưa có cuộc trò chuyện',
  noChatsDesc: 'Bắt đầu cuộc trò chuyện mới!',
  newChat: 'Trò chuyện mới',
  deleteChat: 'Xóa cuộc trò chuyện',
  deleteChatConfirm: 'Bạn có chắc muốn xóa cuộc trò chuyện này?',
  typeMessage: 'Nhập tin nhắn...',
  noMessages: 'Chưa có tin nhắn',
  thinking: 'Đang suy nghĩ...',
  thinkingProcess: 'Quá trình suy nghĩ',
  
  // Settings
  settings: 'Cài đặt',
  aiSettings: 'Cài đặt AI',
  apiKey: 'API Key',
  apiKeyPlaceholder: 'nvapi-xxxxx',
  apiKeyDesc: 'Lấy API key từ build.nvidia.com',
  model: 'Mô hình',
  temperature: 'Temperature',
  temperatureDesc: 'Giá trị cao hơn làm kết quả ngẫu nhiên hơn',
  topP: 'Top P',
  topPDesc: 'Ngưỡng nucleus sampling',
  maxTokens: 'Số token tối đa',
  maxTokensDesc: 'Độ dài tối đa của phản hồi',
  enableThinking: 'Bật chế độ suy nghĩ',
  enableThinkingDesc: 'Hiển thị quá trình suy nghĩ của AI (chỉ DeepSeek)',
  saveSettings: 'Lưu cài đặt',
  settingsSaved: 'Đã lưu cài đặt',
  settingsError: 'Lỗi khi lưu cài đặt',
  apiKeyRequired: 'Vui lòng cấu hình API key trong Cài đặt',
  infoMessage: 'Bạn có thể lấy API key miễn phí từ build.nvidia.com để sử dụng DeepSeek và các mô hình khác.',
  
  // Models
  recommended: 'Đề xuất',
  latestModel: 'Mô hình mới nhất với chế độ suy nghĩ',
  previousGen: 'Thế hệ trước',
  largestModel: 'Mô hình Llama lớn nhất',
  balancedPerf: 'Hiệu suất cân bằng',
  fastEfficient: 'Nhanh và hiệu quả',
  
  // Alerts
  errorTitle: 'Lỗi',
  successTitle: 'Thành công',
  deleteConfirmTitle: 'Xác nhận xóa',
  areYouSure: 'Bạn có chắc muốn xóa',
  
  // Time
  today: 'Hôm nay',
  yesterday: 'Hôm qua',
  daysAgo: 'ngày trước',
  
  // Errors
  failedToImport: 'Không thể nhập nhân vật',
  failedToSave: 'Không thể lưu',
  failedToDelete: 'Không thể xóa',
  failedToCreate: 'Không thể tạo',
  failedToLoad: 'Không thể tải',
  failedToGenerate: 'Không thể tạo phản hồi',
  invalidInput: 'Dữ liệu không hợp lệ',
  noApiKey: 'Chưa có API key',
  
  // Actions
  whatToDo: 'Bạn muốn làm gì?',
  saveChanges: 'Lưu thay đổi',
} as const;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useStore } from '../store/useStore';
import { AISettings } from '../types/character';

const MODELS = [
  { value: 'deepseek-ai/deepseek-v3.2', label: 'DeepSeek V3.2 (Recommended)' },
  { value: 'deepseek-ai/deepseek-v3', label: 'DeepSeek V3' },
  { value: 'meta/llama-3.1-405b-instruct', label: 'Llama 3.1 405B' },
  { value: 'meta/llama-3.1-70b-instruct', label: 'Llama 3.1 70B' },
  { value: 'meta/llama-3.1-8b-instruct', label: 'Llama 3.1 8B' },
];

export function SettingsScreen() {
  const { aiSettings, loadAISettings, updateAISettings } = useStore();
  const [settings, setSettings] = useState<AISettings | null>(null);

  useEffect(() => {
    loadAISettings();
  }, []);

  useEffect(() => {
    if (aiSettings) {
      setSettings(aiSettings);
    }
  }, [aiSettings]);

  const handleSave = async () => {
    if (!settings) return;

    try {
      await updateAISettings(settings);
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  if (!settings) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Text className="text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          AI Settings
        </Text>

        {/* API Key */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            NVIDIA API Key
          </Text>
          <TextInput
            value={settings.apiKey}
            onChangeText={(text) => setSettings({ ...settings, apiKey: text })}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
            placeholder="nvapi-xxxxx"
            secureTextEntry
            autoCapitalize="none"
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Get your API key from build.nvidia.com
          </Text>
        </View>

        {/* Model Selection */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Model
          </Text>
          {MODELS.map((model) => (
            <TouchableOpacity
              key={model.value}
              onPress={() => setSettings({ ...settings, model: model.value })}
              className={`p-3 rounded-lg mb-2 ${
                settings.model === model.value
                  ? 'bg-blue-500'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <Text
                className={
                  settings.model === model.value
                    ? 'text-white font-semibold'
                    : 'text-gray-900 dark:text-white'
                }
              >
                {model.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Temperature */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Temperature: {settings.temperature.toFixed(2)}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-gray-600 dark:text-gray-400 mr-2">0</Text>
            <View className="flex-1">
              <TextInput
                value={settings.temperature.toString()}
                onChangeText={(text) => {
                  const val = parseFloat(text) || 0;
                  setSettings({ ...settings, temperature: Math.max(0, Math.min(2, val)) });
                }}
                keyboardType="decimal-pad"
                className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white text-center"
              />
            </View>
            <Text className="text-gray-600 dark:text-gray-400 ml-2">2</Text>
          </View>
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Higher values make output more random
          </Text>
        </View>

        {/* Top P */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Top P: {settings.topP.toFixed(2)}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-gray-600 dark:text-gray-400 mr-2">0</Text>
            <View className="flex-1">
              <TextInput
                value={settings.topP.toString()}
                onChangeText={(text) => {
                  const val = parseFloat(text) || 0;
                  setSettings({ ...settings, topP: Math.max(0, Math.min(1, val)) });
                }}
                keyboardType="decimal-pad"
                className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white text-center"
              />
            </View>
            <Text className="text-gray-600 dark:text-gray-400 ml-2">1</Text>
          </View>
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Nucleus sampling threshold
          </Text>
        </View>

        {/* Max Tokens */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Max Tokens
          </Text>
          <TextInput
            value={settings.maxTokens.toString()}
            onChangeText={(text) => {
              const val = parseInt(text) || 0;
              setSettings({ ...settings, maxTokens: Math.max(1, Math.min(32000, val)) });
            }}
            keyboardType="number-pad"
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Maximum length of generated response
          </Text>
        </View>

        {/* Enable Thinking */}
        <View className="mb-6 flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-900 dark:text-white">
              Enable Thinking Mode
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Show AI reasoning process (DeepSeek only)
            </Text>
          </View>
          <Switch
            value={settings.enableThinking}
            onValueChange={(value) => setSettings({ ...settings, enableThinking: value })}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-blue-500 p-4 rounded-lg items-center mb-6"
        >
          <Text className="text-white font-semibold text-lg">Save Settings</Text>
        </TouchableOpacity>

        {/* Info */}
        <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <Text className="text-sm text-blue-800 dark:text-blue-200">
            💡 Tip: You can get a free API key from build.nvidia.com to use DeepSeek and other models.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

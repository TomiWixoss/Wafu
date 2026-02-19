import React from 'react';
import { ScrollView, View, Text, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '@/features/settings/hooks/useSettings';
import { ModelSelector } from '@/features/settings/components/ModelSelector';
import { ParameterSlider } from '@/features/settings/components/ParameterSlider';
import { Button } from '@/components/ui/Button';
import { showSuccess, showError } from '@/utils/alerts';
import { STRINGS } from '@/constants/strings';

export function SettingsScreen() {
  const { settings, updateSetting, saveSettings, isSaving } = useSettings();

  const handleSave = async () => {
    const result = await saveSettings();
    if (result.success) {
      showSuccess(STRINGS.settingsSaved);
    } else {
      showError(result.error || STRINGS.settingsError);
    }
  };

  if (!settings) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Text className="text-gray-500">{STRINGS.loading}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {STRINGS.aiSettings}
        </Text>

        {/* API Key */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="key-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              NVIDIA {STRINGS.apiKey}
            </Text>
          </View>
          <TextInput
            value={settings.apiKey}
            onChangeText={(text) => updateSetting('apiKey', text)}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
            placeholder={STRINGS.apiKeyPlaceholder}
            secureTextEntry
            autoCapitalize="none"
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {STRINGS.apiKeyDesc}
          </Text>
        </View>

        {/* Model Selection */}
        <ModelSelector
          selectedModel={settings.model}
          onSelect={(model) => updateSetting('model', model)}
        />

        {/* Temperature */}
        <ParameterSlider
          icon="thermometer-outline"
          label={STRINGS.temperature}
          value={settings.temperature}
          onChange={(val) => updateSetting('temperature', val)}
          min={0}
          max={2}
          description={STRINGS.temperatureDesc}
        />

        {/* Top P */}
        <ParameterSlider
          icon="options-outline"
          label={STRINGS.topP}
          value={settings.topP}
          onChange={(val) => updateSetting('topP', val)}
          min={0}
          max={1}
          description={STRINGS.topPDesc}
        />

        {/* Max Tokens */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="text-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-2">
              {STRINGS.maxTokens}
            </Text>
          </View>
          <TextInput
            value={settings.maxTokens.toString()}
            onChangeText={(text) => {
              const val = parseInt(text) || 1;
              updateSetting('maxTokens', Math.max(1, Math.min(32000, val)));
            }}
            keyboardType="number-pad"
            className="bg-white dark:bg-gray-800 p-3 rounded-lg text-gray-900 dark:text-white"
          />
          <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {STRINGS.maxTokensDesc}
          </Text>
        </View>

        {/* Enable Thinking */}
        <View className="mb-6 flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Ionicons name="bulb-outline" size={18} color="#6B7280" />
              <Text className="text-sm font-semibold text-gray-900 dark:text-white ml-2">
                {STRINGS.enableThinking}
              </Text>
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {STRINGS.enableThinkingDesc}
            </Text>
          </View>
          <Switch
            value={settings.enableThinking}
            onValueChange={(value) => updateSetting('enableThinking', value)}
          />
        </View>

        {/* Save Button */}
        <Button
          onPress={handleSave}
          title={STRINGS.saveSettings}
          icon="save-outline"
          loading={isSaving}
        />

        {/* Info */}
        <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle-outline" size={20} color="#3B82F6" />
            <Text className="text-sm text-blue-800 dark:text-blue-200 ml-2 flex-1">
              {STRINGS.infoMessage}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

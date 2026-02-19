import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { AISettings } from '@/types/character';

export function useSettings() {
  const { aiSettings, loadAISettings, updateAISettings } = useStore();
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadAISettings();
  }, []);

  useEffect(() => {
    if (aiSettings) {
      setSettings(aiSettings);
    }
  }, [aiSettings]);

  const updateSetting = <K extends keyof AISettings>(
    key: K,
    value: AISettings[K]
  ) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  const saveSettings = async () => {
    if (!settings) return { success: false, error: 'No settings to save' };

    setIsSaving(true);
    try {
      await updateAISettings(settings);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    settings,
    updateSetting,
    saveSettings,
    isSaving,
  };
}

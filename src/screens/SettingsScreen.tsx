import React from 'react';
import { ScrollView, View, Text, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '@/features/settings/hooks/useSettings';
import { ModelSelector } from '@/features/settings/components/ModelSelector';
import { ParameterSlider } from '@/features/settings/components/ParameterSlider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { showSuccess, showError } from '@/utils/alerts';
import { COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, SPACING, RADII } from '@/constants/theme';
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.neutral[50] }}>
        <Text style={{ fontFamily: FONT_FAMILY.regular, color: COLORS.neutral[500] }}>
          {STRINGS.loading}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.neutral[0] }} edges={['top']}>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.neutral[50] }}
        contentContainerStyle={{ paddingBottom: SPACING['7xl'] }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: COLORS.neutral[0],
            paddingHorizontal: SPACING.xl,
            paddingTop: SPACING.md,
            paddingBottom: SPACING.xl,
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.neutral[200],
          }}
        >
          <Text
            style={{
              fontFamily: FONT_FAMILY.bold,
              fontSize: FONT_SIZE['3xl'],
              lineHeight: LINE_HEIGHT['3xl'],
              color: COLORS.neutral[900],
            }}
          >
            {STRINGS.settings}
          </Text>
        </View>

        <View style={{ padding: SPACING.xl }}>
          {/* API Key Section */}
          <SectionTitle title={STRINGS.apiKey} icon="key-outline" />
          <Card>
            <TextInput
              value={settings.apiKey}
              onChangeText={(text) => updateSetting('apiKey', text)}
              placeholder={STRINGS.apiKeyPlaceholder}
              placeholderTextColor={COLORS.neutral[400]}
              secureTextEntry
              autoCapitalize="none"
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.base,
                color: COLORS.neutral[900],
                padding: SPACING.xs,
              }}
            />
          </Card>
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: FONT_SIZE.xs,
              color: COLORS.neutral[400],
              marginTop: SPACING.md,
              marginBottom: SPACING['3xl'],
              paddingHorizontal: SPACING.xs,
            }}
          >
            {STRINGS.apiKeyDesc}
          </Text>

          {/* Model Section */}
          <SectionTitle title={STRINGS.model} icon="cube-outline" />
          <ModelSelector
            selectedModel={settings.model}
            onSelect={(model) => updateSetting('model', model)}
          />

          {/* Parameters Section */}
          <SectionTitle title={STRINGS.parameters} icon="options-outline" />

          <ParameterSlider
            icon="thermometer-outline"
            label={STRINGS.temperature}
            value={settings.temperature}
            onChange={(val) => updateSetting('temperature', val)}
            min={0}
            max={2}
            description={STRINGS.temperatureDesc}
          />

          <ParameterSlider
            icon="funnel-outline"
            label={STRINGS.topP}
            value={settings.topP}
            onChange={(val) => updateSetting('topP', val)}
            min={0}
            max={1}
            description={STRINGS.topPDesc}
          />

          {/* Max Tokens */}
          <View style={{ marginBottom: SPACING['3xl'] }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: SPACING.md,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: COLORS.primary[100],
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: SPACING.md,
                  }}
                >
                  <Ionicons name="text-outline" size={14} color={COLORS.primary[600]} />
                </View>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.semibold,
                    fontSize: FONT_SIZE.base,
                    color: COLORS.neutral[900],
                  }}
                >
                  {STRINGS.maxTokens}
                </Text>
              </View>
            </View>
            <TextInput
              value={settings.maxTokens.toString()}
              onChangeText={(text) => {
                const val = parseInt(text) || 1;
                updateSetting('maxTokens', Math.max(1, Math.min(32000, val)));
              }}
              keyboardType="number-pad"
              style={{
                backgroundColor: COLORS.neutral[0],
                paddingHorizontal: SPACING.xl,
                paddingVertical: SPACING.lg,
                borderRadius: RADII.xl,
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.base,
                color: COLORS.neutral[900],
                borderWidth: 1.5,
                borderColor: COLORS.neutral[200],
              }}
            />
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.xs,
                color: COLORS.neutral[400],
                marginTop: SPACING.sm,
              }}
            >
              {STRINGS.maxTokensDesc}
            </Text>
          </View>

          {/* Thinking Toggle */}
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginRight: SPACING.xl }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs }}>
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: COLORS.warning.light,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: SPACING.md,
                    }}
                  >
                    <Ionicons name="bulb-outline" size={14} color={COLORS.warning.main} />
                  </View>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY.semibold,
                      fontSize: FONT_SIZE.base,
                      color: COLORS.neutral[900],
                    }}
                  >
                    {STRINGS.enableThinking}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.regular,
                    fontSize: FONT_SIZE.xs,
                    color: COLORS.neutral[500],
                    marginLeft: 40,
                  }}
                >
                  {STRINGS.enableThinkingDesc}
                </Text>
              </View>
              <Switch
                value={settings.enableThinking}
                onValueChange={(value) => updateSetting('enableThinking', value)}
                trackColor={{ false: COLORS.neutral[200], true: COLORS.primary[400] }}
                thumbColor={settings.enableThinking ? COLORS.primary[600] : COLORS.neutral[0]}
              />
            </View>
          </Card>

          {/* Save Button */}
          <View style={{ marginTop: SPACING['4xl'] }}>
            <Button
              onPress={handleSave}
              title={STRINGS.saveSettings}
              icon="save-outline"
              loading={isSaving}
              size="lg"
            />
          </View>

          {/* Info */}
          <View
            style={{
              backgroundColor: COLORS.info.light,
              padding: SPACING.xl,
              borderRadius: RADII.xl,
              marginTop: SPACING.xl,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={COLORS.info.main}
              style={{ marginRight: SPACING.md, marginTop: 1 }}
            />
            <Text
              style={{
                flex: 1,
                fontFamily: FONT_FAMILY.regular,
                fontSize: FONT_SIZE.sm,
                color: COLORS.info.dark,
                lineHeight: LINE_HEIGHT.base,
              }}
            >
              {STRINGS.infoMessage}
            </Text>
          </View>

          {/* About Section */}
          <SectionTitle title={STRINGS.about} icon="information-circle-outline" />
          <Card>
            <View style={{ gap: SPACING.lg }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.sm, color: COLORS.neutral[500] }}>
                  {STRINGS.appVersion}
                </Text>
                <Text style={{ fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.sm, color: COLORS.neutral[900] }}>
                  1.0.0
                </Text>
              </View>
              <View style={{ height: 1, backgroundColor: COLORS.neutral[100] }} />
              <View>
                <Text style={{ fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.sm, color: COLORS.neutral[500], marginBottom: SPACING.xs }}>
                  {STRINGS.credits}
                </Text>
                <Text style={{ fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.xs, color: COLORS.neutral[400], lineHeight: 18 }}>
                  {STRINGS.creditsDesc}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title, icon }: { title: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        marginTop: SPACING.md,
      }}
    >
      <Ionicons name={icon} size={16} color={COLORS.neutral[400]} style={{ marginRight: SPACING.md }} />
      <Text
        style={{
          fontFamily: FONT_FAMILY.semibold,
          fontSize: FONT_SIZE.sm,
          color: COLORS.neutral[600],
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

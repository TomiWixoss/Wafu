import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AI_MODELS } from '@/constants/models';
import { Badge } from '@/components/ui/Badge';
import { COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, SPACING, RADII } from '@/constants/theme';
import { STRINGS } from '@/constants/strings';

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (model: string) => void;
}

export function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
  return (
    <View style={{ marginBottom: SPACING['3xl'] }}>
      <Text
        style={{
          fontFamily: FONT_FAMILY.semibold,
          fontSize: FONT_SIZE.sm,
          color: COLORS.neutral[600],
          marginBottom: SPACING.lg,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {STRINGS.model}
      </Text>

      {AI_MODELS.map((model) => {
        const isSelected = selectedModel === model.value;
        return (
          <TouchableOpacity
            key={model.value}
            onPress={() => onSelect(model.value)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: SPACING.xl,
              borderRadius: RADII.xl,
              marginBottom: SPACING.md,
              backgroundColor: isSelected ? COLORS.primary[50] : COLORS.neutral[0],
              borderWidth: 1.5,
              borderColor: isSelected ? COLORS.primary[500] : COLORS.neutral[200],
            }}
          >
            {/* Radio circle */}
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: isSelected ? COLORS.primary[600] : COLORS.neutral[300],
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: SPACING.lg,
              }}
            >
              {isSelected && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: COLORS.primary[600],
                  }}
                />
              )}
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.md }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.semibold,
                    fontSize: FONT_SIZE.base,
                    color: isSelected ? COLORS.primary[700] : COLORS.neutral[900],
                  }}
                >
                  {model.label}
                </Text>
                {model.recommended && (
                  <Badge label={STRINGS.recommended} variant="success" size="sm" />
                )}
              </View>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.regular,
                  fontSize: FONT_SIZE.sm,
                  color: COLORS.neutral[500],
                  marginTop: 2,
                }}
              >
                {model.description}
              </Text>
            </View>

            {isSelected && (
              <Ionicons name="checkmark-circle" size={22} color={COLORS.primary[600]} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

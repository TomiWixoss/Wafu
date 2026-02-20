import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING, RADII } from '@/constants/theme';

interface ParameterSliderProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  description?: string;
}

export function ParameterSlider({
  icon,
  label,
  value,
  onChange,
  min,
  max,
  step = 0.01,
  description,
}: ParameterSliderProps) {
  const handleChange = (text: string) => {
    const val = parseFloat(text) || min;
    onChange(Math.max(min, Math.min(max, val)));
  };

  // Calculate fill percentage for visual bar
  const fillPercent = ((value - min) / (max - min)) * 100;

  return (
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
            <Ionicons name={icon} size={14} color={COLORS.primary[600]} />
          </View>
          <Text
            style={{
              fontFamily: FONT_FAMILY.semibold,
              fontSize: FONT_SIZE.base,
              color: COLORS.neutral[900],
            }}
          >
            {label}
          </Text>
        </View>
        <TextInput
          value={value.toString()}
          onChangeText={handleChange}
          keyboardType="decimal-pad"
          style={{
            backgroundColor: COLORS.neutral[100],
            paddingHorizontal: SPACING.lg,
            paddingVertical: SPACING.md,
            borderRadius: RADII.md,
            fontFamily: FONT_FAMILY.semibold,
            fontSize: FONT_SIZE.base,
            color: COLORS.primary[600],
            minWidth: 60,
            textAlign: 'center',
          }}
        />
      </View>

      {/* Visual bar */}
      <View
        style={{
          height: 6,
          backgroundColor: COLORS.neutral[200],
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${fillPercent}%`,
            backgroundColor: COLORS.primary[500],
            borderRadius: 3,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SPACING.xs,
        }}
      >
        <Text style={{ fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.xs, color: COLORS.neutral[400] }}>
          {min}
        </Text>
        <Text style={{ fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.xs, color: COLORS.neutral[400] }}>
          {max}
        </Text>
      </View>

      {description && (
        <Text
          style={{
            fontFamily: FONT_FAMILY.regular,
            fontSize: FONT_SIZE.xs,
            color: COLORS.neutral[400],
            marginTop: SPACING.sm,
          }}
        >
          {description}
        </Text>
      )}
    </View>
  );
}

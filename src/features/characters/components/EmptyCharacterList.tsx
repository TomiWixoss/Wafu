import React from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { STRINGS } from '@/constants/strings';

export function EmptyCharacterList() {
  return (
    <EmptyState
      icon="people-outline"
      title={STRINGS.noCharacters}
      description={STRINGS.noCharactersDesc}
    />
  );
}

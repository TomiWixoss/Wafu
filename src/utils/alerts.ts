import { Alert } from 'react-native';
import { STRINGS } from '@/constants/strings';

export const showError = (message: string, title = STRINGS.errorTitle) => {
  Alert.alert(title, message);
};

export const showSuccess = (message: string, title = STRINGS.successTitle) => {
  Alert.alert(title, message);
};

export const showConfirm = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  Alert.alert(
    title,
    message,
    [
      { text: STRINGS.cancel, style: 'cancel', onPress: onCancel },
      { text: STRINGS.confirm, onPress: onConfirm },
    ]
  );
};

export const showDeleteConfirm = (
  itemName: string,
  onConfirm: () => void
) => {
  Alert.alert(
    STRINGS.deleteConfirmTitle,
    `${STRINGS.areYouSure} ${itemName}?`,
    [
      { text: STRINGS.cancel, style: 'cancel' },
      { text: STRINGS.delete, style: 'destructive', onPress: onConfirm },
    ]
  );
};

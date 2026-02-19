import { Alert } from 'react-native';

export const showError = (message: string, title = 'Error') => {
  Alert.alert(title, message);
};

export const showSuccess = (message: string, title = 'Success') => {
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
      { text: 'Cancel', style: 'cancel', onPress: onCancel },
      { text: 'Confirm', onPress: onConfirm },
    ]
  );
};

export const showDeleteConfirm = (
  itemName: string,
  onConfirm: () => void
) => {
  Alert.alert(
    'Delete Confirmation',
    `Are you sure you want to delete ${itemName}?`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onConfirm },
    ]
  );
};

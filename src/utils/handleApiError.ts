import { Alert } from 'react-native';

export const handleApiError = (error: any) => {
  switch (error.code) {
    case 'SERVICE_UNAVAILABLE':
      Alert.alert('Error', 'Server is unavailable');
      break;
    case 'OUT_OF_STOCK':
      Alert.alert('Error', `Out of stock: ${error.productName}`);
      break;
    case 'MIN_ORDER_SUM':
      Alert.alert('Error', 'Minimum order sum - 1000₽');
      break;
    default:
      Alert.alert('Error', 'Unexpected error occured. Try later.');
  }
};

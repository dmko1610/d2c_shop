import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, List, Text } from 'react-native-paper';
import { cartStore } from '../stores/CartStore';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleApiError } from '../utils/handleApiError';
import { submitOrderRandomError } from '../services/api';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const ConfirmScreen = observer(() => {
  const navigation = useNavigation<Navigation>();

  const handleConfirm = () => {
    if (cartStore.total < 1000) {
      Alert.alert('Minimal order sum 1000 ₽!');

      return;
    }

    Alert.alert(
      'Are you sure?',
      'Money will be withdrawn from your account immediately',
      [
        { text: 'Cancel', style: 'destructive' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await submitOrderRandomError(cartStore.toPayload());
              cartStore.clearCart();
              navigation.navigate('ThankYou');
            } catch (error) {
              handleApiError(error);
            }
          },
          style: 'default',
        },
      ],
    );
  };

  return (
    <SafeAreaView edges={['left', 'right', 'bottom', 'top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge">Your order</Text>
        {cartStore.items.map(({ product, quantity }) => (
          <List.Item
            key={product.id}
            title={`${product.name} x${quantity}`}
            description={`₽${product.price} x ${quantity} = ₽${product.price * quantity
              }`}
          />
        ))}

        <Divider style={styles.divider} />

        {cartStore.options.length > 0 ? (
          <>
            <Text variant="titleMedium">Options: </Text>
            {cartStore.options.map(opt => (
              <Text key={opt.id}>{opt.label}</Text>
            ))}
          </>
        ) : (
          <Text variant="titleMedium">No options chosen</Text>
        )}

        <Divider style={styles.divider} />

        <Text variant="titleLarge">Total: {cartStore.total} ₽</Text>
        <Button
          mode="contained"
          onPress={handleConfirm}
          style={styles.confirmButton}
          testID="confirmButton">
          Confirm order
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
});

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  divider: { marginVertical: 16 },
  confirmButton: { marginTop: 32 },
});

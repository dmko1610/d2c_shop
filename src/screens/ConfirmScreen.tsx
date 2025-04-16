import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { cartStore } from '../stores/CartStore';

const ConfirmScreen = observer(() => {
  const navigation = useNavigation();

  const handleConfirm = () => {
    if (cartStore.total < 1000) {
      Alert.alert('Minimal order sum 1000 ₽!');

      return;
    }

    Alert.alert('Are you sure?', 'Money will be withdrawn from your account immediately', [
      { text: 'Cancel', style: 'destructive' },
      {
        text: 'Confirm',
        onPress: () => {
          Alert.alert('Thank you!')
          cartStore.clearCart();
          navigation.goBack();

        },
        style: 'default',
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge">Your order</Text>
      {cartStore.items.map(item => (
        <Text variant="titleSmall" key={item.id}>
          {item.name} - {item.price} ₽
        </Text>
      ))}

      <Divider style={styles.divider} />

      {cartStore.options.length > 0 && (
        <>
          <Text variant="titleMedium">Options: </Text>
          {cartStore.options.map(opt => (
            <Text key={opt.id}>{opt.label}</Text>
          ))}
        </>
      )}

      <Divider style={styles.divider} />

      <Text variant="titleLarge">Total: {cartStore.total} ₽</Text>

      <Button mode="contained" onPress={handleConfirm}>
        Confirm order
      </Button>
    </ScrollView>
  );
});

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  divider: { marginVertical: 16 },
});

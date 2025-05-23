import { observer } from 'mobx-react-lite';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Checkbox, Text } from 'react-native-paper';
import { cartStore } from '../stores/CartStore';
import { ORDER_OPTIONS } from '../constants/orderOptions';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../stores/types';
import React from 'react';

// "REAL" DATA
const sampleProducts: Product[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: `p${i}`,
  name: `Product ${i + 1}`,
  price: 150 + i * 10,
}));

// const sampleProductsForTests: Product[] = Array.from({ length: 3 }).map(
//   (_, i) => ({
//     id: `p${i}`,
//     name: `Product ${i + 1}`,
//     price: 150 + i * 10,
//   }),
// );

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const CartItem = React.memo(({ item }: { item: Product }) => (
  <Card style={styles.cartItem}>
    <Card.Title title={item.name} subtitle={`₽${item.price}`} />
    <Card.Actions>
      <Button onPress={() => cartStore.addItem(item)} testID="addButton">
        Add
      </Button>
      <Button
        onPress={() => cartStore.removeItem(item.id)}
        testID="removeButton">
        Remove
      </Button>
    </Card.Actions>
  </Card>
));

const CartScreen = observer(() => {
  const navigaiton = useNavigation<Navigation>();

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom', 'top']}
      style={styles.container}>
      <View style={styles.cart}>
        <Text variant="titleLarge" style={styles.cartTitle}>
          Products
        </Text>
        <FlatList
          data={sampleProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CartItem item={item} />}
          initialNumToRender={10}
          windowSize={5}
        />
      </View>

      <View style={styles.bottomSection}>
        <Text variant="titleLarge" style={styles.deliveryOptionsText}>
          Delivery options
        </Text>

        {ORDER_OPTIONS.map(option => (
          <Checkbox.Item
            key={option.id}
            label={option.label}
            status={
              cartStore.options.find(o => o.id === option.id)
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => cartStore.toggleOption(option)}
            testID="optionCheckbox"
          />
        ))}

        <Text variant="titleMedium" style={styles.total}>
          Total ₽{cartStore.total}
        </Text>
        <Button
          mode="contained"
          style={styles.checkoutButton}
          onPress={() => navigaiton.navigate('Confirm')}>
          Checkout
        </Button>
      </View>
    </SafeAreaView>
  );
});

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  cart: { flex: 1, padding: 16 },
  cartTitle: { marginBottom: 12 },
  cartItem: { marginBottom: 10 },
  total: { marginTop: 20 },
  deliveryOptionsText: { marginTop: 20 },
  checkoutButton: { marginTop: 16 },
  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#E0D6EB',
  },
});

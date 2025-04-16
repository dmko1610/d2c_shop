import { observer } from 'mobx-react-lite';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Checkbox, Text } from 'react-native-paper';
import { cartStore, Product } from '../stores/CartStore';
import { ORDER_OPTIONS } from '../constants/orderOptions';

const sampleProducts: Product[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: `p${i}`,
  name: `Product ${i + 1}`,
  price: 150 + i * 10,
}));

const CartScreen = observer(() => {
  return (
    <View style={styles.cart}>
      <Text variant="titleLarge" style={styles.cartTitle}>
        Products
      </Text>
      <FlatList
        data={sampleProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.cartItem}>
            <Card.Title title={item.name} subtitle={`₽${item.price}`} />
            <Card.Actions>
              <Button onPress={() => cartStore.addItem(item)}>Add</Button>
              <Button onPress={() => cartStore.removeItem(item.id)}>
                Remove
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

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

        />
      ))}
      <Text variant="titleMedium" style={styles.total}>
        Total ₽{cartStore.total}
      </Text>
    </View>
  );
});

export default CartScreen;

const styles = StyleSheet.create({
  cart: { flex: 1, padding: 16 },
  cartTitle: { marginBottom: 12 },
  cartItem: { marginBottom: 10 },
  total: { marginTop: 20 },
  deliveryOptionsText: { marginTop: 20 },
});

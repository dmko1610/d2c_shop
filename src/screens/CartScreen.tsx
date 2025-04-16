import { observer } from 'mobx-react-lite';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { cartStore, Product } from '../stores/CartStore';

const sampleProducts: Product[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `p${i}`,
  name: `Product ${i + 1}`,
  price: 150 + i * 10,
}))


const CartScreen = observer(() => {
  return (
    <View style={styles.cart}>
      <Text variant='titleLarge' style={styles.cartTitle}>Products</Text>
      <FlatList
        data={sampleProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.cartItem}>
            <Card.Title title={item.name} subtitle={`₽${item.price}`} />
            <Card.Actions>
              <Button onPress={() => cartStore.addItem(item)}>Add</Button>
              <Button onPress={() => cartStore.removeItem(item.id)}>Remove</Button>
            </Card.Actions>
          </Card>
        )}
      />

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
});

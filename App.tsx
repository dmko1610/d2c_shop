import React from 'react';
import { SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import CartScreen from './src/screens/CartScreen';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CartScreen />
      </SafeAreaView>
    </PaperProvider>
  );
}

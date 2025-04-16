import React from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import CartScreen from './src/screens/CartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmScreen from './src/screens/ConfirmScreen';
import ThankYouScreen from './src/screens/ThankYouScreen';

export type RootStackParamList = {
  Cart: undefined;
  Confirm: undefined;
  ThankYou: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: 'Cart' }}
          />
          <Stack.Screen
            name="Confirm"
            component={ConfirmScreen}
            options={{ title: 'Confirmation' }}
          />
          <Stack.Screen name="ThankYou" component={ThankYouScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
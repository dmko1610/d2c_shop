import React from 'react';
import {StyleSheet} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import CartScreen from './src/screens/CartScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmScreen from './src/screens/ConfirmScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{title: 'Cart'}}
          />
          <Stack.Screen
            name="Confirm"
            component={ConfirmScreen}
            options={{title: 'Confirmation'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
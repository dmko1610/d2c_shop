import React from 'react';
import { PaperProvider } from 'react-native-paper';
import CartScreen from './src/screens/CartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmScreen from './src/screens/ConfirmScreen';
import ThankYouScreen from './src/screens/ThankYouScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type RootStackParamList = {
  Cart: undefined;
  Confirm: undefined;
  ThankYou: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider
      settings={{
        icon: (props) => <Icon {...props} />
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Confirm"
            component={ConfirmScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ThankYou"
            component={ThankYouScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

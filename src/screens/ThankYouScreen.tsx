import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function ThankYouScreen() {
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    const timer = setTimeout(() => { navigation.navigate('Cart') }, 4000)
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineMedium">
        Thank you!
      </Text>
      <Text style={styles.message} variant="bodyLarge">
        We've already started assembling it. Heading back to the main page...
      </Text>

      <Button mode="outlined" onPress={() => navigation.navigate('Cart')}>
        Go back manually
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    marginBottom: 32,
  },
});

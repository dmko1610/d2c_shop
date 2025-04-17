import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function ThankYouScreen() {
  const navigation = useNavigation<Navigation>();
  const [countdown, setCountdown] = useState(3);


  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    const timer = setTimeout(() => { navigation.navigate('Cart') }, 4000)

    return () => { clearTimeout(timer); clearInterval(interval) };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Icon source={"heart"} size={100} color='#7dC545' />
      <Text style={styles.title} variant="headlineMedium">
        Thank you!
      </Text>
      <Text style={styles.message} variant="bodyLarge">
        We've already started assembling it. Heading back to the main page in {countdown}
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

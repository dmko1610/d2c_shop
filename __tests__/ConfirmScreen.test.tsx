import { NavigationContainer } from '@react-navigation/native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Alert } from 'react-native';
import ConfirmScreen from '../src/screens/ConfirmScreen';
import { cartStore } from '../src/stores/CartStore';

const mockNavigate = jest.fn();

jest.mock('../src/api/analytics');
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.spyOn(Alert, 'alert').mockImplementation(() => { });

function renderConfirmScreen() {
  render(
    <NavigationContainer>
      <ConfirmScreen />
    </NavigationContainer>,
  );
}

describe('Confirm Screen', () => {
  it('displays alert when total is less than 1000 ₽', async () => {
    cartStore.items = [
      { product: { id: 'p1', name: 'Product 1', price: 500 }, quantity: 1 },
      { product: { id: 'p2', name: 'Product 2', price: 200 }, quantity: 2 },
    ];

    renderConfirmScreen();

    const confirmButton = screen.getByText('Confirm order');
    fireEvent.press(confirmButton);

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith('Minimal order sum 1000 ₽!'),
    );
  });

  it('displays the confirm alert', async () => {
    cartStore.items = [
      { product: { id: 'p1', name: 'Product 1', price: 700 }, quantity: 2 },
    ];
    const navigateMock = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate: navigateMock,
      });
    renderConfirmScreen();

    const confirmButton = screen.getByTestId('confirmButton');
    fireEvent.press(confirmButton);

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Are you sure?',
        'Money will be withdrawn from your account immediately',
        expect.anything(),
      ),
    );
  });
});

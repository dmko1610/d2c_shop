import { NavigationContainer } from '@react-navigation/native';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Alert } from 'react-native';
import ConfirmScreen from '../src/screens/ConfirmScreen';
import { cartStore } from '../src/stores/CartStore';
import { submitOrderRandomError } from '../src/services/api';

const mockNavigate = jest.fn();

jest.mock('../src/api/analytics');
jest.mock('../src/services/api', () => ({
  submitOrderRandomError: jest.fn(),
}));
jest.mock('../src/utils/handleApiError', () => ({
  handleApiError: jest.fn(),
}));
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
  beforeEach(() => {
    cartStore.clearCart();
    cartStore.addItem({ id: '1', name: 'Item 1', price: 1000 });
  });

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

  xit('navigates to ThankYou on successful order', async () => {
    submitOrderRandomError.mockResolvedValueOnce({
      message: 'Order submitted successfully',
    });

    renderConfirmScreen();

    const confirmButton = screen.getByTestId('confirmButton');
    fireEvent.press(confirmButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Are you sure?',
        expect.any(String),
        expect.any(Array),
      );
    });

    const alertButtons = Alert.alert.mock.calls[0][2];
    await act(() => alertButtons[1].onPress());

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('ThankYou');
    });
  });
});

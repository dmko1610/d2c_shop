import {NavigationContainer} from '@react-navigation/native';
import {cartStore} from '../src/stores/CartStore';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import CartScreen from '../src/screens/CartScreen';

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

function renderCartScreen() {
  render(
    <NavigationContainer>
      <CartScreen />
    </NavigationContainer>,
  );
}

describe('CartScreen', () => {
  beforeEach(() => {
    cartStore.items = [];
    cartStore.options = [];
  });

  it('displays product list and delivery options titles', () => {
    renderCartScreen();

    expect(screen.getByText('Products')).toBeTruthy();
    expect(screen.getByText('Delivery options')).toBeTruthy();
    expect(screen.getByText('Checkout')).toBeTruthy();
  });

  it('adds and removes product', () => {
    renderCartScreen();

    const addButtons = screen.getAllByTestId('addButton');
    fireEvent.press(addButtons[0]);
    expect(cartStore.items.length).toBe(1);

    const removeButtons = screen.getAllByTestId('removeButton');
    fireEvent.press(removeButtons[0]);

    expect(cartStore.items.length).toBe(0);
  });

  it('toggles a delivery option', () => {
    renderCartScreen();

    const checkboxes = screen.getAllByTestId('optionCheckbox');
    fireEvent.press(checkboxes[0]);
    expect(cartStore.options.some(o => o.label === 'Leave at the door')).toBe(
      true,
    );

    fireEvent.press(checkboxes[0]);
    expect(cartStore.options.some(o => o.label === 'Leave at the door')).toBe(
      false,
    );
  });

  xit('displays correct total price', async () => {
    renderCartScreen();

    const addButtons = screen.getAllByTestId('addButton');
    fireEvent.press(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Total ₽160')).toBeTruthy();
    });
  });

  it('navigates to confirm screen on checkout', async () => {
    renderCartScreen();

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.press(checkoutButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Confirm');
    });
  });
});

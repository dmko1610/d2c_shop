import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import ThankYouScreen from '../src/screens/ThankYouScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('ThankYouScreen', () => {
  it('navigates to Cart when "Go back manually" button is pressed', async () => {
    render(<ThankYouScreen />);

    const goBackButton = screen.getByText('Go back manually');
    fireEvent.press(goBackButton);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('Cart'));
  });
});

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameInput from './NameInput';
import '@testing-library/jest-dom';
import { setNameInput } from '../../state/slices/searchSlice';
import { userEvent } from '@testing-library/user-event';

const mockStore = configureStore();

describe('NameInput', () => {
  it('dispatches state updates when user types in input', async () => {
    const initialState = {
      search: {
        nameInput: '',
        addonsDropdown: '-',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <NameInput />
      </Provider>,
    );

    const inputElement = screen.getByPlaceholderText('Game name');
    await userEvent.type(inputElement, 'Skyrim');

    expect(store.dispatch).toHaveBeenCalledWith(setNameInput('Skyrim'));
    expect(inputElement).toHaveValue('Skyrim');
  });

  it('renders correctly', () => {
    const store = mockStore({
      search: {
        nameInput: '',
        addonsDropdown: '-',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    });

    render(
      <Provider store={store}>
        <NameInput />
      </Provider>,
    );

    expect(screen.getByText('Game Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Game name')).toBeInTheDocument();
  });
});

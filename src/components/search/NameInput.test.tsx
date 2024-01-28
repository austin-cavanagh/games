import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameInput from './NameInput';
import '@testing-library/jest-dom';
import { setNameInput } from '../../state/slices/searchSlice';
import { userEvent } from '@testing-library/user-event';

const initialState = {
  search: {
    nameInput: '',
    addonsDropdown: '-',
    voiceDropdown: '-',
    sortDropdown: 'Order',
  },
};

const mockStore = configureStore();

describe('NameInput', () => {
  it('dispatches state updates when user types in input', async () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <NameInput />
      </Provider>,
    );

    const inputElement = await screen.findByPlaceholderText('Game name');
    await userEvent.type(inputElement, 'Skyrim');

    expect(store.dispatch).toHaveBeenCalledWith(setNameInput('Skyrim'));
    expect(inputElement).toHaveValue('Skyrim');
  });

  it('renders correctly', async () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <NameInput />
      </Provider>,
    );

    expect(await screen.findByText('Game Name')).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('Game name')).toBeInTheDocument();
  });
});

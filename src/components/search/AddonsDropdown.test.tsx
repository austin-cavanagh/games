import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddonsDropdown from './AddonsDropdown';
import { RootState } from '../../state/store';
import '@testing-library/jest-dom';
import { setAddonsDropdown } from '../../state/slices/searchSlice';

const mockStore = configureStore<Partial<RootState>>();
const options: string[] = ['-', 'Yes', 'No'];

const initialState = {
  search: {
    nameInput: '',
    addonsDropdown: '-',
    voiceDropdown: '-',
    sortDropdown: 'Order',
  },
};

describe('AddonsDropdown', () => {
  it('renders the dropdown with default value correctly', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <AddonsDropdown />
      </Provider>,
    );

    expect(screen.getByText('Add-Ons')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByTestId('add-ons-chevron-icon')).toBeInTheDocument();
  });

  it('dispatches setAddonsDropdown when dropdown input changes', async () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <AddonsDropdown />
      </Provider>,
    );

    userEvent.click(screen.getByTestId('add-ons-chevron-icon'));
    const optionElement = await screen.findByText('Yes');
    await userEvent.click(optionElement);

    expect(store.dispatch).toHaveBeenCalledWith(setAddonsDropdown('Yes'));
  });

  it('renders with gray-900 color', () => {
    const initialState = {
      search: {
        nameInput: '',
        addonsDropdown: 'Yes',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <AddonsDropdown />
      </Provider>,
    );
  });

  options.forEach(option => {
    it(`allows the user to select option "${option}"`, async () => {
      const store = mockStore(initialState);

      render(
        <Provider store={store}>
          <AddonsDropdown />
        </Provider>,
      );

      const dropdownElement = await screen.findByTestId('add-ons-chevron-icon');
      userEvent.click(dropdownElement);
      const optionElement = await screen.findByText(option);
      userEvent.click(optionElement);

      expect(await screen.findByText(option)).toBeInTheDocument();
    });
  });
});

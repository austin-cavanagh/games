import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SortDropdown from './SortDropdown';
import { RootState } from '../../state/store';
import '@testing-library/jest-dom';

const mockStore = configureStore<Partial<RootState>>();

const options = ['Order', 'A-Z', 'Z-A', 'Game Files'];

describe('SortDropdown', () => {
  it('renders the dropdown with default value correctly', () => {
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
        <SortDropdown />
      </Provider>,
    );

    expect(screen.getByText('Sort By: Order')).toBeInTheDocument();
    expect(screen.getByTestId('sort-chevron-icon')).toBeInTheDocument();
  });

  options.forEach(option => {
    it(`allows the user to select option "${option}"`, async () => {
      const store = mockStore({
        search: {
          nameInput: '',
          addonsDropdown: option,
          voiceDropdown: '-',
          sortDropdown: 'Order',
        },
      });

      render(
        <Provider store={store}>
          <SortDropdown />
        </Provider>,
      );

      userEvent.click(screen.getByTestId('sort-chevron-icon'));
      const optionElement = await screen.findByText(option);
      userEvent.click(optionElement);
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });
});
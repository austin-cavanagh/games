import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchContainer from './SearchContainer';
import '@testing-library/jest-dom';

const initialState = {
  search: {
    nameInput: '',
    addonsDropdown: '-',
    voiceDropdown: '-',
    sortDropdown: 'Order',
  },
};

const mockStore = configureStore();

const store = mockStore(initialState);

describe('SearchContainer', () => {
  it('renders components crashing', () => {
    render(
      <Provider store={store}>
        <SearchContainer />
      </Provider>,
    );

    expect(screen.getByText('Game Name')).toBeInTheDocument();
    expect(screen.getByText('Add-Ons')).toBeInTheDocument();
    expect(screen.getByText('Voice Support')).toBeInTheDocument();
    expect(screen.getByText('Sort By: Order')).toBeInTheDocument();
  });
});

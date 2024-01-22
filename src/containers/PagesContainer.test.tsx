import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PagesContainer from './PagesContainer';
import '@testing-library/jest-dom';

const mockStore = configureStore();
const store = mockStore({
  search: {
    nameInput: '',
    addonsDropdown: '-',
    voiceDropdown: '-',
    sortDropdown: 'Order',
  },
});

describe('SearchContainer', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <PagesContainer />
      </Provider>,
    );

    expect(
      screen.getByText('Showing 1 to 12 of of 269 results'),
    ).toBeInTheDocument();
    expect(screen.getByText('Add-Ons')).toBeInTheDocument();
    expect(screen.getByText('Voice Support')).toBeInTheDocument();
    expect(screen.getByText('Sort By: Order')).toBeInTheDocument();
  });
});

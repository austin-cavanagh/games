import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PagesDisplayLeft from './PagesDisplayLeft';
import '@testing-library/jest-dom';

const mockStore = configureStore();

describe('PagesDisplayLeft', () => {
  it('renders components without crashing', () => {
    const initialState = {
      results: {
        currentPage: 1,
        totalGames: 269,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PagesDisplayLeft />
      </Provider>,
    );

    expect(screen.getByTestId('start-result')).toHaveTextContent('1');
    expect(screen.getByTestId('end-result')).toHaveTextContent('12');
    expect(screen.getByTestId('total-games')).toHaveTextContent('269');
  });
});

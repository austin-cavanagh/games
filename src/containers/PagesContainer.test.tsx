import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PagesContainer from './PagesContainer';
import '@testing-library/jest-dom';

const initialState = {
  results: {
    isLoading: true,
    isError: false,
    currentPage: 1,
    loadingProgress: 0,
    totalGames: 0,
    selectedGame: null,
    gamesArray: [],
    promptUpdate: false,
  },
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('PagesContainer', () => {
  it('renders components without crashing', () => {
    render(
      <Provider store={store}>
        <PagesContainer />
      </Provider>,
    );
  });
});

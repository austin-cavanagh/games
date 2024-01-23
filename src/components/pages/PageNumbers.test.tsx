import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PageNumbers from './PageNumbers';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { setCurrentPage } from '../../state/slices/resultsSlice';

const mockStore = configureStore();

describe('PageNumbers', () => {
  it('renders component initial state without crashing', () => {
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

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PageNumbers />
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('sends action to redux store to change currentPage state', async () => {
    const initialState = {
      results: {
        isLoading: true,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 120,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: false,
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <PageNumbers />
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    const pageNumber = screen.getByText('3');

    await userEvent.click(pageNumber);

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentPage(3));
  });
});

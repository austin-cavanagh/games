import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PagesDisplayRight from './PagesDisplayRight';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { setCurrentPage } from '../../state/slices/resultsSlice';
import { RootState } from '../../state/store';

const mockStore = configureStore();

describe('PagesDisplayRight', () => {
  it('renders components  with both icons', () => {
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
        <PagesDisplayRight />
      </Provider>,
    );

    expect(screen.getByTestId('pages-left-chevron')).toBeInTheDocument();
    expect(screen.getByTestId('pages-right-chevron')).toBeInTheDocument();
  });

  it('clicking the right chevron updates currentPage', async () => {
    const initialState = {
      results: {
        isLoading: true,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 100,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: false,
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <PagesDisplayRight />
      </Provider>,
    );

    const rightChevron = screen.getByTestId('pages-right-chevron');
    await userEvent.click(rightChevron);

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentPage(2));
  });

  it('clicking the left chevron updates currentPage', async () => {
    const initialState = {
      results: {
        isLoading: true,
        isError: false,
        currentPage: 2,
        loadingProgress: 0,
        totalGames: 100,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: false,
      },
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <PagesDisplayRight />
      </Provider>,
    );

    const leftChevron = screen.getByTestId('pages-left-chevron');
    await userEvent.click(leftChevron);

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentPage(1));
  });

  it('clicking the left chevron on page 1 does not change currentPage', async () => {
    const initialState = {
      results: {
        isLoading: true,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 100,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: false,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <PagesDisplayRight />
      </Provider>,
    );

    const leftChevron = screen.getByTestId('pages-left-chevron');
    await userEvent.click(leftChevron);

    const state: RootState = store.getState() as RootState;
    expect(state.results.currentPage).toBe(1);
  });
});

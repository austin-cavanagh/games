import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UpdateGamePopup from './UpdateGamesPopup';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import {
  clearGamesArray,
  hidePromptUpdates,
  // fetchGamesThunk,
} from '../../state/slices/resultsSlice';

const mockStore = configureStore();

describe('UpdateGamePopup', () => {
  it('renders all text inside the component', () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 1,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: true,
      },
      search: {
        nameInput: '',
        addonsDropdown: '-',
        voiceDropdown: '-',
        sortDropdown: 'Order',
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UpdateGamePopup />
      </Provider>,
    );

    expect(screen.getByText('Notification')).toBeInTheDocument();
    expect(
      screen.getByText('Game data has changed since your last update'),
    ).toBeInTheDocument();
    expect(screen.getByText('Update Now')).toBeInTheDocument();
    expect(screen.getByText('Remind Me Later')).toBeInTheDocument();
  });

  it('dispatches fetchGamesThunk when Update Now button is clicked', async () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 1,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: true,
      },
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
        <UpdateGamePopup />
      </Provider>,
    );

    const updateNowButton = screen.getByText('Update Now');
    await userEvent.click(updateNowButton);

    expect(store.dispatch).toHaveBeenCalledWith(hidePromptUpdates());
    expect(store.dispatch).toHaveBeenCalledWith(clearGamesArray());
  });

  it('dispatches hidePromptUpdates when Remind Me Later button is clicked', async () => {
    const initialState = {
      results: {
        isLoading: false,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 1,
        selectedGame: null,
        gamesArray: [],
        promptUpdate: true,
      },
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
        <UpdateGamePopup />
      </Provider>,
    );

    const remindMeLaterButton = screen.getByText('Remind Me Later');
    await userEvent.click(remindMeLaterButton);

    expect(store.dispatch).toHaveBeenCalledWith(hidePromptUpdates());
  });
});

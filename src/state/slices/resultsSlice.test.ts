import { Game } from '../../types';
import {
  setLoadingProgress,
  setCurrentPage,
  setSelectedGame,
  setTotalGames,
  hidePromptUpdates,
  clearGamesArray,
  default as resultsReducer,
  ResultsState,
} from './resultsSlice';

import { configureStore } from '@reduxjs/toolkit';
import { fetchGamesThunk } from './resultsSlice';
import fetchGamesData from '../../functions/fetchGamesData';

jest.mock('../../functions/fetchGamesData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const games: Game[] = [
  { ID: 1, Name: 'Game 1', SupportsAddons: true, SupportsVoice: true },
] as Game[];

const initialState = {
  isLoading: false,
  isError: false,
  currentPage: 1,
  loadingProgress: 0,
  totalGames: games.length,
  selectedGame: null,
  gamesArray: [],
  promptUpdate: false,
};

describe('reducers and actions', () => {
  it('should handle setLoadingProgress', () => {
    const action = setLoadingProgress(50);
    const newState = resultsReducer(initialState, action);
    expect(newState.loadingProgress).toEqual(50);
  });

  it('should handle setCurrentPage', () => {
    const action = setCurrentPage(100);
    const newState = resultsReducer(initialState, action);
    expect(newState.currentPage).toEqual(100);
  });

  it('should handle setSelectedGame', () => {
    const action = setSelectedGame(games[0]);
    const newState = resultsReducer(initialState, action);
    expect(newState.selectedGame).toEqual(games[0]);
  });

  it('should handle setTotalGames', () => {
    const action = setTotalGames(100);
    const newState = resultsReducer(initialState, action);
    expect(newState.totalGames).toEqual(100);
  });

  it('should handle hidePromptUpdates', () => {
    const action = hidePromptUpdates();
    const newState = resultsReducer(initialState, action);
    expect(newState.promptUpdate).toEqual(false);
  });

  it('should handle clearGamesArray', () => {
    const action = clearGamesArray();
    const newState = resultsReducer(initialState, action);
    expect(newState.gamesArray).toEqual([]);
  });
});

describe('fetchGamesThunk action handlers', () => {
  it('handle fetchGamesThunk.fulfilled', async () => {
    // Mock set of games returned by the fetchGamesData function
    const mockGames = [
      { ID: 1, Name: 'Test Game', SupportsAddons: true, SupportsVoice: false },
    ];

    // Mock fetchGamesData to simulate successful api call returning game data
    (fetchGamesData as jest.Mock).mockResolvedValue(mockGames);

    // Create Redux store and include resultsReducer
    const store = configureStore({
      reducer: { results: resultsReducer },
    });

    // Dispatch fetchGamesThunk
    await store.dispatch(fetchGamesThunk());

    const state = store.getState().results;
    expect(state.isLoading).toBeFalsy();
    expect(state.isError).toBeFalsy();
    expect(state.gamesArray).toEqual(mockGames);
  });

  it('handle fetchGamesThunk.rejected', async () => {
    (fetchGamesData as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    const store = configureStore({
      reducer: { results: resultsReducer },
    });

    await store.dispatch(fetchGamesThunk());
    const state = store.getState().results;
    expect(state.isLoading).toBeFalsy();
    expect(state.isError).toBeTruthy();
  });

  it('handles non-Error rejection with a generic error message', async () => {
    (fetchGamesData as jest.Mock).mockRejectedValue(
      'Some non-Error type rejection',
    );

    const store = configureStore({
      reducer: { results: resultsReducer },
    });

    await store.dispatch(fetchGamesThunk());
    const state = store.getState().results;
    expect(state.isError).toBeTruthy();
  });

  it('handle fetchGamesThunk.pending', () => {
    const mockInitialState = {
      isLoading: true,
      isError: false,
      currentPage: 1,
      loadingProgress: 0,
      totalGames: 0,
      selectedGame: null,
      gamesArray: [],
      promptUpdate: false,
    };

    const store = configureStore({
      reducer: { results: resultsReducer },
      preloadedState: { results: mockInitialState },
    });

    const state = store.getState().results;
    expect(state.isLoading).toBeTruthy();
    expect(state.gamesArray).toHaveLength(0);
  });

  it('sets promptUpdate to true when updates are fetched', async () => {
    const oldMockGames = [
      { ID: 1, Name: 'Game 1', SupportsAddons: false, SupportsVoice: false },
    ];
    const mockGames = [
      { ID: 1, Name: 'Game 2', SupportsAddons: false, SupportsVoice: false },
    ];
    (fetchGamesData as jest.Mock).mockResolvedValue(mockGames);

    const initialState: { results: ResultsState } = {
      results: {
        isLoading: false,
        isError: false,
        currentPage: 1,
        loadingProgress: 0,
        totalGames: 0,
        selectedGame: null,
        gamesArray: oldMockGames as Game[],
        promptUpdate: false,
      },
    };

    const store = configureStore({
      reducer: { results: resultsReducer },
      preloadedState: initialState,
    });

    await store.dispatch(fetchGamesThunk());
    const state = store.getState().results;
    expect(state.promptUpdate).toBeTruthy();
  });
});

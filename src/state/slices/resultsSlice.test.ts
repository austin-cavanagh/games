import { Game } from '../../types';
import {
  setLoadingProgress,
  setCurrentPage,
  setSelectedGame,
  setTotalGames,
  hidePromptUpdates,
  clearGamesArray,
  default as resultsReducer,
} from './resultsSlice';

// Mock games data
const games: Game[] = [
  { ID: 1, Name: 'Game 1', SupportsAddons: true, SupportsVoice: true },
] as Game[];

describe('reducers and actions', () => {
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

import { configureStore } from '@reduxjs/toolkit';
import { fetchGamesThunk } from './resultsSlice';
import fetchGamesData from '../../functions/fetchGamesData';

jest.mock('../../functions/fetchGamesData', () => ({
  __esModule: true, // This property makes it work correctly with ES Module interop
  default: jest.fn(), // Mock the default export
}));

// Mock successful fetch
const mockGames = [
  { ID: 1, Name: 'Test Game', SupportsAddons: true, SupportsVoice: false },
];

describe('fulfilled', () => {
  beforeEach(() => {
    (fetchGamesData as jest.Mock).mockResolvedValue(mockGames);
  });

  it('handles fetchGamesThunk.fulfilled', async () => {
    const store = configureStore({
      reducer: {
        results: resultsReducer,
      },
    });

    await store.dispatch(fetchGamesThunk());

    const state = store.getState().results;
    expect(state.isLoading).toBeFalsy();
    expect(state.gamesArray).toEqual(mockGames);
    expect(state.isError).toBeFalsy();
  });
});

describe('rejected', () => {
  beforeEach(() => {
    (fetchGamesData as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
  });

  it('handles fetchGamesThunk.rejected', async () => {
    const store = configureStore({
      reducer: {
        results: resultsReducer,
      },
    });

    await store.dispatch(fetchGamesThunk());

    const state = store.getState().results;
    expect(state.isLoading).toBeFalsy();
    expect(state.isError).toBeTruthy();
  });
});

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

describe('pending', () => {
  it('initial state is loading (simulating pending)', () => {
    const store = configureStore({
      reducer: {
        results: resultsReducer,
      },
      preloadedState: {
        results: mockInitialState,
      },
    });

    const state = store.getState().results;
    expect(state.isLoading).toBeTruthy();
    expect(state.gamesArray).toHaveLength(0);
  });
});

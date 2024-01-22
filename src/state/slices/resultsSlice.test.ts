import { Game } from '../../types';
import {
  setLoadingProgress,
  setCurrentPage,
  setSelectedGame,
  setTotalGames,
  hidePromptUpdates,
  clearGamesArray,
  //   fetchGamesThunk,
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

// HANDLING ASYNC THUNK

// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';

// const mockStore = configureStore({
//   reducer: {
//     // Assuming 'results' is the name of the state slice handled by resultsReducer
//     results: resultsReducer,
//     // Include other slice reducers here as needed
//   },
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
// });

// describe('fetchGamesThunk action creator', () => {
//   afterEach(() => {
//     fetchMock.restore();
//   });

//   it('dispatches actions correctly on successful fetch', async () => {
//     fetchMock.getOnce('path/to/your/api/endpoint', {
//       body: games,
//       headers: { 'content-type': 'application/json' },
//     });

//     const store = mockStore({
//       results: {
//         isLoading: false,
//         isError: false,
//         currentPage: 1,
//         loadingProgress: 0,
//         totalGames: 0,
//         selectedGame: null,
//         gamesArray: [],
//         promptUpdate: false,
//       },
//     });

//     const expectedActions = [
//       { type: 'results/fetchGamesThunk/pending' },
//       { type: 'results/fetchGamesThunk/fulfilled', payload: games },
//     ];

//     await store.dispatch(fetchGamesThunk());

//     // Check if the expected actions were dispatched
//     const actualActions = store
//       .getActions()
//       .map(action => ({ type: action.type, payload: action.payload }));
//     expect(actualActions).toEqual(expect.arrayContaining(expectedActions));
//   });
// });

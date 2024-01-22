import { Game } from '../../types';
import {
  setLoadingProgress,
  setCurrentPage,
  setSelectedGame,
  setTotalGames,
  hidePromptUpdates,
  clearGamesArray,
  // fetchGamesThunk,
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

// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';

// const middlewares: any = [thunk];

// const mockStore = configureMockStore(middlewares);

// describe('fetchGamesThunk action creator', () => {
//   afterEach(() => {
//     fetchMock.restore();
//   });

//   it('dispatches actions correctly on successful fetch', async () => {
//     const expectedGames = [
//       { ID: 1, Name: 'Game 1', SupportsAddons: true, SupportsVoice: true },
//     ];

//     fetchMock.getOnce('/endpoint/to/fetch/games', {
//       body: { data: expectedGames }, // Assuming your API wraps the response in a "data" property
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

//     await store.dispatch(fetchGamesThunk());

//     const actions = store.getActions();
//     expect(actions).toEqual([
//       { type: 'results/fetchGamesThunk/pending', payload: undefined },
//       { type: 'results/fetchGamesThunk/fulfilled', payload: expectedGames },
//     ]);
//   });
// });

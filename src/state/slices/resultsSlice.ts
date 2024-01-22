import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Game } from '../../types';
import fetchGamesData from '../../functions/fetchGamesData';
import isEqual from 'lodash.isequal';

type ResultsState = {
  isLoading: boolean;
  isError: boolean;
  loadingProgress: number;
  currentPage: number;
  totalGames: number;
  selectedGame: Game | null;
  gamesArray: Game[];
  promptUpdate: boolean;
};

const initialState: ResultsState = {
  isLoading: true,
  isError: false,
  currentPage: 1,
  loadingProgress: 0,
  totalGames: 0,
  selectedGame: null,
  gamesArray: [],
  promptUpdate: false,
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setLoadingProgress: (state, action: PayloadAction<number>) => {
      state.loadingProgress = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedGame: (state, action: PayloadAction<Game | null>) => {
      state.selectedGame = action.payload;
    },
    setTotalGames: (state, action: PayloadAction<number>) => {
      state.totalGames = action.payload;
    },
    hidePromptUpdates: state => {
      state.promptUpdate = false;
    },
    clearGamesArray: state => {
      state.gamesArray = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGamesThunk.pending, state => {
        if (state.gamesArray.length === 0) state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchGamesThunk.fulfilled,
        (state, action: PayloadAction<Game[]>) => {
          if (state.gamesArray.length === 0) {
            state.isLoading = false;
            state.gamesArray = action.payload;
            return;
          }

          const gamesArray = state.gamesArray;
          const newGamesArray = action.payload;

          const noUpdates = isEqual(gamesArray, newGamesArray);
          if (noUpdates) state.promptUpdate = true;
        },
      )
      .addCase(fetchGamesThunk.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const fetchGamesThunk = createAsyncThunk<
  Game[],
  void,
  { rejectValue: string }
>('results/fetchGamesThunk', async (_, { rejectWithValue, dispatch }) => {
  try {
    const games = await fetchGamesData(dispatch);
    return games;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const {
  setLoadingProgress,
  setCurrentPage,
  setSelectedGame,
  setTotalGames,
  hidePromptUpdates,
  clearGamesArray,
} = resultsSlice.actions;

export default resultsSlice.reducer;

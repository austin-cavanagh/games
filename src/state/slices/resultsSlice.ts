import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Game } from '../../types';
import fetchGameData from '../../functions/fetchGameData';

type ResultsState = {
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  loadingProgress: number;
  totalGames: number;
  gamesArray: Game[];
  newGameData: Game[];
  selectedGame: Game | null;
};

const initialState: ResultsState = {
  isLoading: true,
  isError: false,
  currentPage: 1,
  loadingProgress: 0,
  totalGames: 0,
  gamesArray: [],
  newGameData: [],
  selectedGame: null,
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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGamesThunk.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchGamesThunk.fulfilled,
        (state, action: PayloadAction<Game[]>) => {
          state.isLoading = false;
          state.gamesArray = action.payload;
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
    const games = await fetchGameData(dispatch);
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
} = resultsSlice.actions;

export default resultsSlice.reducer;

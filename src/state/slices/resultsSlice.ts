import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Game, GameUpdate } from '../../types';
import fetchGamesData from '../../functions/fetchGamesData';
import trackGameUpdates from '../../functions/trackGameUpdates';

type ResultsState = {
  isLoading: boolean;
  isError: boolean;
  loadingProgress: number;
  currentPage: number;
  totalGames: number;
  selectedGame: Game | null;
  gamesArray: Game[];
  updatesArray: GameUpdate[];
  promptUpdates: boolean;
};

const initialState: ResultsState = {
  isLoading: true,
  isError: false,
  currentPage: 1,
  loadingProgress: 0,
  totalGames: 0,
  selectedGame: null,
  gamesArray: [],
  updatesArray: [],
  promptUpdates: true,
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
      state.promptUpdates = false;
    },
    updateGamesArray: state => {
      const updatesArray = state.updatesArray;
      const gamesArray = state.gamesArray;
      const newGamesArray = [...gamesArray];

      updatesArray.forEach(update => {
        if (update.type === 'added') {
          oldGamesArray.push(update.data);
        }

        if (update.type === 'removed') {
          state.oldGamesArray = oldGamesArray.filter(game => {
            return game.ID !== update.data.ID;
          });
        }

        if (update.type === 'updated') {
          state;
        }
      });

      state.gamesArray = //
        state.updatesArray = [];
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
          const fetchedGamesArray = action.payload;

          if (state.gamesArray.length === 0) {
            state.gamesArray = fetchedGamesArray;
            return;
          }

          const tempGamesArray: Game[] = [...state.gamesArray];
          const newUpdatesArray: GameUpdate[] = trackGameUpdates(
            tempGamesArray,
            fetchedGamesArray,
          );

          // Set updatesArray state to equal newUpdatesArray
          state.updatesArray = newUpdatesArray;
          state.promptUpdates = true;
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
} = resultsSlice.actions;

export default resultsSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Game, GamesObject } from '../../types';
import fetchGameData from '../../functions/fetchGameData';

type FormState = {
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  loadingProgress: number;
  gamesData: GamesObject;
  pageDisplay: Game[];
};

const initialState: FormState = {
  isLoading: true,
  isError: false,
  currentPage: 1,
  loadingProgress: 0,
  gamesData: {},
  pageDisplay: [],
};

function createPageDisplay(
  gameData: GamesObject,
  currentPage: number,
  itemsPerPage: number = 12
) {
  const gamesArray = Object.values(gameData);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = gamesArray.slice(startIndex, endIndex);
  console.log(paginatedItems);
  return paginatedItems;
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setLoadingProgress: (state, action: PayloadAction<number>) => {
      state.loadingProgress = action.payload;
    },
    setPageDisplay: state => {
      state.pageDisplay = createPageDisplay(state.gamesData, state.currentPage);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGames.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
        state.isLoading = false;
        state.gamesData = action.payload.reduce((acc, game) => {
          acc[game.ID] = game;
          return acc;
        }, {} as GamesObject);
      })
      .addCase(fetchGames.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const fetchGames = createAsyncThunk<
  Game[],
  void,
  { rejectValue: string }
>('results/fetchGames', async (_, { rejectWithValue, dispatch }) => {
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

export const { setLoadingProgress, setPageDisplay } = resultsSlice.actions;

export default resultsSlice.reducer;

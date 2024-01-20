import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Game } from '../../types';
import fetchGameData from '../../functions/fetchGameData';

type FormState = {
  data: Game[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  loadingProgress: number;
};

const initialState: FormState = {
  data: [],
  isLoading: true,
  isError: false,
  currentPage: 1,
  loadingProgress: 0,
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setLoadingProgress: (state, action: PayloadAction<number>) => {
      state.loadingProgress = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGames.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
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
    const sortedGames = await fetchGameData(dispatch);
    return sortedGames;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const { setLoadingProgress } = resultsSlice.actions;

export default resultsSlice.reducer;

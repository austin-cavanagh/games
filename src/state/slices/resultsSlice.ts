import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Game } from '../../types';

type FormState = {
  data: Game[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
};

const initialState: FormState = {
  data: [],
  isLoading: true,
  isError: false,
  currentPage: 1,
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    // reducers
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

export const fetchGames = createAsyncThunk(
  'results/fetchGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('../../../games.json');

      if (!response.ok) {
        throw new Error('Failed to fetch games data');
      }

      const data = await response.json();
      const games: Game[] = data.data;
      const sortedGames: Game[] = games.sort((a, b) => a.Order - b.Order);

      return sortedGames;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const {} = resultsSlice.actions;

export default resultsSlice.reducer;

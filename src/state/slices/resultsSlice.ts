import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Game, GamesObject } from "../../types";
import fetchGameData from "../../functions/fetchGameData";

type FormState = {
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  loadingProgress: number;
  gamesData: GamesObject;
  totalGames: number;
  pageDisplay: Game[];
  gamesArray: Game[];
};

const initialState: FormState = {
  isLoading: true,
  isError: false,
  currentPage: 1,
  loadingProgress: 0,
  gamesData: {},
  totalGames: 0,
  pageDisplay: [],
  gamesArray: [],
};

function createPageDisplay(
  gameData: GamesObject,
  currentPage: number,
  itemsPerPage: number = 12,
): Game[] {
  const gamesArray = Object.values(gameData);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // filtering criteria

  // sorting criteria
  const sortedGames = gamesArray.sort((a, b) => a.Order - b.Order);

  const paginatedGames = sortedGames.slice(startIndex, endIndex);
  console.log(paginatedGames);
  return paginatedGames;
}

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setLoadingProgress: (state, action: PayloadAction<number>) => {
      state.loadingProgress = action.payload;
    },
    setPageDisplay: (state) => {
      state.pageDisplay = createPageDisplay(state.gamesData, state.currentPage);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.pageDisplay = createPageDisplay(state.gamesData, state.currentPage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchGamesThunk.fulfilled,
        (state, action: PayloadAction<Game[]>) => {
          state.isLoading = false;
          const gamesArray = action.payload;
          state.gamesArray = gamesArray;
          console.log(gamesArray);
          state.gamesData = gamesArray.reduce((acc, game) => {
            acc[game.ID] = game;
            return acc;
          }, {} as GamesObject);
          state.totalGames = Object.keys(state.gamesData).length;
          state.pageDisplay = createPageDisplay(
            state.gamesData,
            state.currentPage,
          );
        },
      )
      .addCase(fetchGamesThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const fetchGamesThunk = createAsyncThunk<
  Game[],
  void,
  { rejectValue: string }
>("results/fetchGamesThunk", async (_, { rejectWithValue, dispatch }) => {
  try {
    const games = await fetchGameData(dispatch);
    return games;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const { setLoadingProgress, setPageDisplay, setCurrentPage } =
  resultsSlice.actions;

export default resultsSlice.reducer;

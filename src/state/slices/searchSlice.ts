import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SearchState = {
  nameInput: string;
};

const initialState: SearchState = {
  nameInput: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setNameInput: (state, action: PayloadAction<string>) => {
      state.nameInput = action.payload;
    },
  },
});

export const { setNameInput } = searchSlice.actions;

export default searchSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type SearchState = {
  nameInput: string;
  addonsDropdown: string;
  voiceDropdown: string;
  sortDropdown: string;
};

const initialState: SearchState = {
  nameInput: '',
  addonsDropdown: '-',
  voiceDropdown: '-',
  sortDropdown: 'Order',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setNameInput: (state, action: PayloadAction<string>) => {
      state.nameInput = action.payload;
    },
    setAddonsDropdown: (state, action: PayloadAction<string>) => {
      state.addonsDropdown = action.payload;
    },
    setVoiceDropdown: (state, action: PayloadAction<string>) => {
      state.voiceDropdown = action.payload;
    },
    setSortDropdown: (state, action: PayloadAction<string>) => {
      state.sortDropdown = action.payload;
    },
  },
});

export const {
  setNameInput,
  setAddonsDropdown,
  setVoiceDropdown,
  setSortDropdown,
} = searchSlice.actions;

export default searchSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DropdownOptions } from '../../types';

type SearchState = {
  nameInput: string;
  addonsDropdown: DropdownOptions;
  voiceDropdown: DropdownOptions;
  sortByValue: string;
};

const initialState: SearchState = {
  nameInput: '',
  addonsDropdown: {
    id: 0,
    label: 'Filter on addons',
    query: '',
  },
  voiceDropdown: {
    id: 0,
    label: 'Filter on voice support',
    query: '',
  },
  sortByValue: 'Order',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setNameInput: (state, action: PayloadAction<string>) => {
      state.nameInput = action.payload;
    },
    setAddonsDropdown: (state, action: PayloadAction<DropdownOptions>) => {
      state.addonsDropdown = action.payload;
    },
    setVoiceDropdown: (state, action: PayloadAction<DropdownOptions>) => {
      state.voiceDropdown = action.payload;
    },
    setSortByValue: (state, action: PayloadAction<string>) => {
      state.sortByValue = action.payload;
    },
  },
});

export const {
  setNameInput,
  setAddonsDropdown,
  setVoiceDropdown,
  setSortByValue,
} = searchSlice.actions;

export default searchSlice.reducer;

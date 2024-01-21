import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./slices/resultsSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

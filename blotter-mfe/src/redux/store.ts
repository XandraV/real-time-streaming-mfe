import { configureStore } from "@reduxjs/toolkit";
import { blotterDataApi } from "./services/blotterDataApi";

export const store = configureStore({
  reducer: {
    [blotterDataApi.reducerPath]: blotterDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blotterDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

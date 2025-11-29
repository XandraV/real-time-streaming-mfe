import { configureStore } from "@reduxjs/toolkit";
import { instrumentSearchApi } from "./services/instrumentSearchApi";

export const store = configureStore({
  reducer: {
    [instrumentSearchApi.reducerPath]: instrumentSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(instrumentSearchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { instrumentSearchApi } from "./services/instrumentSearchApi";
import { candlestickDataApi } from "./services/candlestickDataApi";

export const store = configureStore({
  reducer: {
    [instrumentSearchApi.reducerPath]: instrumentSearchApi.reducer,
    [candlestickDataApi.reducerPath]: candlestickDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      instrumentSearchApi.middleware,
      candlestickDataApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

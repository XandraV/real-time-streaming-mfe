import { configureStore } from "@reduxjs/toolkit";
import { instrumentSearchApi } from "./services/instrumentSearchApi";
import { candlestickDataApi } from "./services/candlestickDataApi";
import instrumentReducer from "./services/instrumentSlice";
import { tradesListenerMiddleware } from "./tradesMiddleware";

export const store = configureStore({
  reducer: {
    instruments: instrumentReducer,
    [instrumentSearchApi.reducerPath]: instrumentSearchApi.reducer,
    [candlestickDataApi.reducerPath]: candlestickDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(tradesListenerMiddleware.middleware)
      .concat(instrumentSearchApi.middleware, candlestickDataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

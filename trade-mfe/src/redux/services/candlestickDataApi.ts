import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type CandlestickData } from "lightweight-charts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const candlestickDataApi = createApi({
  reducerPath: "candlestickDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCandlestickData: builder.query<
      CandlestickData[],
      { searchString: string }
    >({
      query: ({ searchString }) => `candles?searchString=${searchString}`,
      transformResponse: (response: {
        ticker: string;
        result: CandlestickData[];
      }) => response.result,
    }),
  }),
});

export const { useGetCandlestickDataQuery, useLazyGetCandlestickDataQuery } =
  candlestickDataApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type CandlestickData } from "lightweight-charts";

export const candlestickDataApi = createApi({
  reducerPath: "candlestickDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
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

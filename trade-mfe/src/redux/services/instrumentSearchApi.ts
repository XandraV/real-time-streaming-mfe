import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Instrument } from "../types";

export const instrumentSearchApi = createApi({
  reducerPath: "instrumentSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInstruments: builder.query<Instrument[], { searchString: string }>({
      query: ({ searchString }) => `search?searchString=${searchString}`,
      transformResponse: (response: { result: Instrument[] }) =>
        response.result,
    }),
  }),
});

export const { useGetInstrumentsQuery, useLazyGetInstrumentsQuery } =
  instrumentSearchApi;

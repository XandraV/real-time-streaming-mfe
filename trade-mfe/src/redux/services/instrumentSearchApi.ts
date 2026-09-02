import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Instrument } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const instrumentSearchApi = createApi({
  reducerPath: "instrumentSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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

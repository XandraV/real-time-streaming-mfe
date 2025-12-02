import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BlotterRow } from "../types";

export const blotterDataApi = createApi({
  reducerPath: "blotterDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBlotterData: builder.query<BlotterRow[], { searchString: string }>({
      query: ({ searchString }) => `blotter?searchString=${searchString}`,
      transformResponse: (response: { result: BlotterRow[] }) =>
        response.result,
    }),
  }),
});

export const { useGetBlotterDataQuery, useLazyGetBlotterDataQuery } =
  blotterDataApi;

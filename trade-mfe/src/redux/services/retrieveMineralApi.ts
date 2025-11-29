import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const retrieveMineralApi = createApi({
  reducerPath: "retrieveMineralApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mindat.org/v1/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Token ${process.env.REACT_APP_MINDAT_API_KEY}`
      );
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    retrieveMineral: builder.query<{ results: any[] }, { id: string }>({
      query: ({ id }) => `geomaterials/${id}/`,
      // transformResponse: (response: any) => ({
      //   results: response.results.filter((m: any) => m),
      // }),
    }),
  }),
});


export const { useRetrieveMineralQuery, useLazyRetrieveMineralQuery } =
  retrieveMineralApi;

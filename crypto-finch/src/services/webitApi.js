import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const webitApiHeaders = {
  'x-rapidapi-host': import.meta.env.VITE_REACT_APP_WEBIT_RAPIDAPI_HOST,
  'x-rapidapi-key': import.meta.env.VITE_REACT_APP_WEBIT_RAPIDAPI_KEY,
};
const createRequest = (url) => ({ url, headers: webitApiHeaders });

export const webitApi = createApi({
  reducerPath: 'webitApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_WEBIT_API_URL }),
  endpoints: (builder) => ({
    getWebit: builder.query({
      query: ({ nftSearch }) => createRequest(`/search?q=${nftSearch}`),
    }),
  }),
});

export const {
  useGetWebitQuery,
} = webitApi;

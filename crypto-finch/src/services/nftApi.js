import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const nftApiHeaders = {
  'x-rapidapi-host': import.meta.env.VITE_REACT_APP_NFT_RAPIDAPI_HOST,
  'x-rapidapi-key': import.meta.env.VITE_REACT_APP_OPENSEA_RAPIDAPI_KEY,
};
const createRequest = (url) => ({ url, headers: nftApiHeaders });

export const nftApi = createApi({
  reducerPath: 'nftApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_NFT_API_URL }),
  endpoints: (builder) => ({
    getNfts: builder.query({
      query: () => createRequest(`/assets`),
    }),
    getSlugAssets: builder.query({
      query: ({collectionSlug}) => createRequest(`/assets?collection_slug=${collectionSlug}`),
    }),
    getSlugs: builder.query({
      query: () => createRequest(`/collections`),
    }),
    getCollections: builder.query({
      query: ({collectionSlug}) => createRequest(`/collection/${collectionSlug}`),
    }),
  }),
});

export const {
  useGetNftsQuery,
  useGetSlugAssetsQuery,
  useGetSlugsQuery,
  useGetCollectionsQuery,
} = nftApi;

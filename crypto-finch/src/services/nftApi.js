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
    // RANDOM NFTS IN THE WELCOME NFTS PAGE
    getNfts: builder.query({
      query: () => createRequest(`/assets/`),
    }),
    // SINGLE COLLECTION BODY 20 NFTS INSIDE DISCOVER COLLECTION
    getSlugAssets: builder.query({
      query: ({collectionSlug}) => createRequest(`/assets/?collection_slug=${collectionSlug}`),
    }),
    // COLLECTIONS SLUGS
    getSlugs: builder.query({
      query: () => createRequest(`/collections/`),
    }),
    // SINGLE COLLECTION HEADER STATS
    getCollections: builder.query({
      query: ({collectionSlug}) => createRequest(`/collection/?collection_slug=${collectionSlug}`),
    }),
  }),
});

export const {
  useGetNftsQuery,
  useGetSlugAssetsQuery,
  useGetSlugsQuery,
  useGetCollectionsQuery,
} = nftApi;

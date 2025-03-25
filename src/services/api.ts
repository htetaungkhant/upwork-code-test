import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/constants';
import { PostType } from '@/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFilteredPosts: builder.query<PostType[], string>({
      query: (searchTerm) => ({
        url: API_CONFIG.ENDPOINT,
        params: searchTerm ? { q: searchTerm } : undefined,
      }),
    }),
  }),
});

export const { useGetFilteredPostsQuery } = api;
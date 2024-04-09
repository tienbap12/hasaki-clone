import { baseUrl } from '../components/Base';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const CartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    timeout: 10000,
    prepareHeaders: async (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (email) => `/cart/${email}`,
    }),
    addCart: builder.mutation({
      query: (dataArray) => {
        return {
          url: '/cart/addToCart',
          method: 'POST',
          body: dataArray,
        };
      },
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: '/cart',
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteItem: builder.mutation({
      query: (data) => ({
        url: `/cart/${data}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteItemMutation,
  useAddCartMutation,
} = CartApi;

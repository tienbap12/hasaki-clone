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
      // timeout: 3000,
      pollingInterval: 300,
    }),
    addCart: builder.mutation({
      query: (dataArray) => {
        return {
          url: '/cart/add-to-cart',
          method: 'POST',
          body: dataArray,
        };
      },
    }),
    updateCart: builder.mutation({
      query: (datas) => ({
        url: '/cart',
        method: 'PATCH',
        body: datas,
      }),
    }),
    deleteItem: builder.mutation({
      query: (data) => ({
        url: '/cart/drop-item',
        method: 'DELETE',
        body: data,
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

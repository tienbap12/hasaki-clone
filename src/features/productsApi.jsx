import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../components/Base';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/product',
    }),
    getSingleProduct: builder.query({
      query: (productId) => `/product/${productId}`,
    }),
    getAllCategory: builder.query({
      query: () => '/icon-categories',
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetAllCategoryQuery,
} = productsApi;

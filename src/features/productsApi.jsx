import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://determined-slug-turtleneck-shirt.cyclic.app/api',
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

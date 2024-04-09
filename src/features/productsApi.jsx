import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../components/Base';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page, size, searchString }) =>
        `/products?size=${size}&page=${page}&searchString=${searchString}`,
    }),
    getSingleProduct: builder.query({
      query: (productId) => `/products/${productId}`,
    }),
    getAllCategory: builder.query({
      query: () => '/iconCategories',
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetAllCategoryQuery,
} = productsApi;

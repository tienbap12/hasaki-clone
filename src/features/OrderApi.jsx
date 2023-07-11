import { baseUrl } from '../components/Base';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const OrderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    timeout: 4000,
    prepareHeaders: async (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (email) => `/order/${email}`,
    }),
    getDetailOrder: builder.query({
      query: (id) => `/order/detail/${id}`,
    }),
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: '/order',
          method: 'POST',
          body: {
            email_user: data.email,
            address: data.address,
            phone_number: data.phone,
          },
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetDetailOrderQuery,
} = OrderApi;

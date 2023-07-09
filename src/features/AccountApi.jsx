import { baseUrl } from '../components/Base';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const AccountApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (args) => {
        // const { email, pwd } = args;
        return {
          url: '/user/login',
          method: 'post',
          body: {
            email: args.email,
            password: args.password,
          },
        };
      },
    }),
    registerUser: builder.mutation({
      query: (args) => {
        return {
          url: '/user/register',
          method: 'post',
          body: {
            email: args.email,
            gender: args.gender,
            password: args.password,
            name: args.fullName,
            day: args.day,
            month: args.month,
            year: args.year,
          },
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = AccountApi;

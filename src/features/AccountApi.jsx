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
        return {
          url: '/users/login',
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
          url: '/users/register',
          method: 'post',
          body: {
            email: args.email,
            gender: args.gender,
            password: args.password,
            name: args.fullName,
            date: args.day,
            month: args.month,
            year: args.year,
            phoneNumber: args.phoneNumber,
          },
        };
      },
    }),
    /** FIXME::fix logout Api */
    // logOut: builder.mutation({
    //   query: (args) => {
    //     return {
    //       url: `/users/logout/${args}`,
    //       method: 'post',
    //     };
    //   },
    // }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogOutMutation,
} = AccountApi;

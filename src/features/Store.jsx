import React from 'react';
import { productsApi } from './productsApi';
import cartReducer, { getTotals } from './CartSlice';
import authReducer from './AuthSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { AccountApi } from './AccountApi';
import { CartApi } from './CartApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [AccountApi.reducerPath]: AccountApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      AccountApi.middleware,
      CartApi.middleware
    ),
});
store.dispatch(getTotals());

export default store;

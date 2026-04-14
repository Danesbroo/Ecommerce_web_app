"use client"
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginSlice';
import cartSlice  from './cart';
import wishSlice  from './wishlistslice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    cartItem: cartSlice,
    wishlist: wishSlice,
  }
});

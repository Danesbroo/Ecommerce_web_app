"use client";
import Cookies from "js-cookie";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: Cookies.get("user") ?? '',
  token: Cookies.get("token") ?? ''
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
   userDetails: (state, {payload})=>{
    state.user = payload.user
    Cookies.set("user", payload.user);

    state.token = payload.token
    Cookies.set("token" , payload.token);
   },
    
   Logout: (state)=>{
    state.user = ""
    Cookies.remove("user");

    state.token = "";
    Cookies.remove("token");
   },
   
  
  },
})

// Action creators are generated for each case reducer function
export const { userDetails,Logout } = loginSlice.actions

export default loginSlice.reducer
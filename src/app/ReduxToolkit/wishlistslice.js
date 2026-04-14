import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// SAFE LOCAL STORAGE
const loadWishFromStorage = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("wishItem")) || [];
};

const initialState = {
  wishlist: loadWishFromStorage(),
};

export const wishSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    // ADD
    addToWish: (state, action) => {
      const exists = state.wishlist.find(
        item => item._id === action.payload._id
      );

      if (exists) {
        toast.info("Already in wishlist");
        return;
      }

      state.wishlist.push(action.payload);

      localStorage.setItem(
        "wishItem",
        JSON.stringify(state.wishlist)
      );

      toast.success("Added to wishlist");
    },

    // DELETE
    deleteWish: (state, action) => {
        if (typeof window !== "undefined" && confirm("Are you sure to delete this item from wishlist?")) {
      state.wishlist = state.wishlist.filter(
        item => item._id !== action.payload
      );

      localStorage.setItem(
        "wishItem",
        JSON.stringify(state.wishlist)
      );
    
      toast.success("Removed from wishlist");
    }
    },

  },
});

export const { addToWish, deleteWish } = wishSlice.actions;
export default wishSlice.reducer;

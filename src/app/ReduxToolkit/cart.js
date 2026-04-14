
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// ---------- SAFE LOCALSTORAGE CHECK (SSR FIX) ----------
function loadCartFromLocalStorage() {
  if (typeof window === "undefined") return []; // SSR: no window

  try {
    const stored = localStorage.getItem("cartItem");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    return [];
  }
}

const initialState = {
  cartItem: loadCartFromLocalStorage(),
};

// ---------- REDUX SLICE ----------
export const cartSlice = createSlice({
  name: 'cartItem',
  initialState,

  reducers: {

    // DELETE
    deleteCart: (state, action) => {
      if (typeof window !== "undefined" && confirm("Are you sure to delete this item from cart?")) {
        const updatedCart = state.cartItem.filter((item) => item._id !== action.payload);
        state.cartItem = updatedCart;

        localStorage.setItem("cartItem", JSON.stringify(updatedCart));
        toast.success("Product removed from cart");
      }
    },
    // clear cart
    clearCart: (state) => {
      state.cartItem = []
  
      if (typeof window !== "undefined") {
          localStorage.removeItem("cartItem")
      }
  
      toast.success("Cart cleared successfully")
  },

    // ADD
    addToCart: (state, action) => {
      const item = state.cartItem.find(v => v._id === action.payload._id);

      if (item) {
        if (item.quantity < 10) {
          item.quantity++;
          toast.info("Product quantity updated");
        } else {
          toast.error("Maximum quantity reached");
        }
      } else {
        const newItem = {
          _id: action.payload._id,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.sale_price,
          quantity: 1,
          stock: action.payload.stock
        };

        state.cartItem.push(newItem);
        toast.success("Product added successfully");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      }
    },

    // INCREASE
    increaseQty: (state, action) => {
      const item = state.cartItem.find(v => v._id === action.payload);

      if (item && item.quantity < 10) {
        item.quantity++;
      } else {
        toast.error("Maximum quantity reached");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      }
    },

    // DECREASE
    decreaseQty: (state, action) => {
      const item = state.cartItem.find(v => v._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        toast.error("Minimum quantity is 1");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      }
    },

    // SET QTY
    setQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItem.find(v => v._id === id);

      if (item) {
        if (qty < 1) item.quantity = 1;
        else if (qty > 10) item.quantity = 10;
        else item.quantity = qty;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      }
    }

  },
});

// EXPORTS
export const { deleteCart, addToCart, clearCart, increaseQty, decreaseQty, setQty } = cartSlice.actions;
export default cartSlice.reducer;


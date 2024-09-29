import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [], // Initial state is an array of cart items
  reducers: {
    add: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Increment quantity if item exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity; // Update quantity if item exists
      }
    },
  },
});

export const { add, remove, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;

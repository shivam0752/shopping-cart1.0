import { configureStore } from "@reduxjs/toolkit";
import {CartSlice} from "./Slices/cartSlice"; // Import default export

export const store = configureStore({
    reducer: {
        cart: CartSlice.reducer, // Use the default export directly
    },
});
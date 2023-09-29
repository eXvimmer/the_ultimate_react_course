import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCartItem } from "../../types";

const initialState: { cart: iCartItem[] } = {
  cart: [
    {
      pizzaId: 13,
      name: "Mediterranean",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<iCartItem>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<iCartItem["pizzaId"]>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action: PayloadAction<iCartItem["pizzaId"]>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        ++item.quantity;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<iCartItem["pizzaId"]>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item && item.quantity > 0) {
        --item.quantity;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

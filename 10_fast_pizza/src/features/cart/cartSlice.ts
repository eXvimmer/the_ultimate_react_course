import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCartItem, RootState } from "../../types";

const initialState: { cart: iCartItem[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<iCartItem>) {
      const item = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (item) {
        ++item.quantity;
        item.totalPrice = item.quantity * item.unitPrice;
      } else {
        state.cart.push(action.payload);
      }
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

// TODO: checkout reselect library instead of this
export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((prev, cur) => prev + cur.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((prev, cur) => prev + cur.totalPrice, 0);

export default cartSlice.reducer;

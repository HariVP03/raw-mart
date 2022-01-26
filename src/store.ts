import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import cartReducer from "./features/cart";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type userState = ReturnType<typeof store.getState>;

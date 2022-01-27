import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type item = {
  prodImage: string[];
  category: string;
  productName: string;
  price: number;
  currency: string;
  discount?: number;
};

const initialValue = null as any;

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: initialValue,
  },
  reducers: {
    setCart: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type item = {
  prodImage: string[];
  category: string;
  productName: string;
  price: number;
  currency: string;
  discount?: number;
};

const initialValue = [] as any;

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: initialValue,
  },
  reducers: {
    addItem: (state, action: PayloadAction<item | null>) => {
      state.value?.push(action.payload);
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;

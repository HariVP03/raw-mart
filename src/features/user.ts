import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const initialValue = null as User | null;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialValue,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

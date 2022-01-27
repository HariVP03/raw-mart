import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: "",
  },
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

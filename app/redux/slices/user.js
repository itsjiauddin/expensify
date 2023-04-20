import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    logout: (state) => {
      state.userId = null;
    },
  },
});

export const { setUserId, setUserLoading, logout } = userSlice.actions;

export default userSlice.reducer;

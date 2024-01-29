import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: {},
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getCurrentPostAction: (state, action) => {
      state.currentPost = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { getCurrentPostAction } = postSlice.actions;

export default postSlice.reducer;

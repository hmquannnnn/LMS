import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: {},
  author: {},
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getCurrentPostAction: (state, action) => {
      state.currentPost = action.payload;
    },
    getCurrentAuthors: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { getCurrentPostAction, getCurrentAuthors } = postSlice.actions;

export default postSlice.reducer;

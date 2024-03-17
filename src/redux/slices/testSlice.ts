import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentReadingTest: {},
  currentWritingTest: {},
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    getCurrentReadingTest: (state, action) => {
      state.currentReadingTest = action.payload;
    },
    getCurrentWritingTest: (state, action) => {
      state.currentWritingTest = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { getCurrentReadingTest, getCurrentWritingTest } =
  testSlice.actions;

export default testSlice.reducer;

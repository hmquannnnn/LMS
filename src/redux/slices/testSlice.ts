import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTest: {},
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    getCurrentTest: (state, action) => {
      state.currentTest = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { getCurrentTest } = testSlice.actions;

export default testSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  token: string;
  dateOfBirth: string;
}

export interface AccountState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: AccountState = {};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getCurrentPostAction: (state, action) => {},
  },
  extraReducers: (builder) => {},
});

export const {} = postSlice.actions;

export default postSlice.reducer;

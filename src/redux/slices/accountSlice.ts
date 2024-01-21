import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

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

const initialState: AccountState = {
    isAuthenticated: false,
    user: {
        id: 0,
        firstName: '',
        lastName: '',
        username: '',
        role: '',
        token: '',
        dateOfBirth: '',
    },
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            console.log(action.payload);
            state.user = action.payload;
        },
        doGetAccountAction: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doLogOutAction: (state) => {
            state.isAuthenticated = false;
            state.user = initialState.user;
        },
    },
    extraReducers: (builder) => {
    },
});

export const {doLoginAction, doGetAccountAction, doLogOutAction} = accountSlice.actions;

export default accountSlice.reducer;

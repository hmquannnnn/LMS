"use client";

import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "@/redux/slices/accountSlice";
import { classSlice } from "@/redux/slices/classSlice";
import { documentSlice } from "@/redux/slices/documentSlice";
// import {devToolsEnhancer} from "@reduxjs/toolkit/src/devtoolsExtension";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    classes: classSlice.reducer,
    document: documentSlice.reducer
  },
  devTools: process.browser,
  // ,
  // devTools: false,
  // enhancers: [devToolsEnhancer({ realtime: true, port: 8000 })],
});

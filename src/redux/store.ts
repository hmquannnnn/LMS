"use client";
"use client";

import {configureStore} from "@reduxjs/toolkit";
import {accountSlice} from "@/redux/slices/accountSlice";
import {classSlice} from "@/redux/slices/classSlice";
import {postSlice} from "@/redux/slices/postSlice";
import {testSlice} from "@/redux/slices/testSlice";
// import {devToolsEnhancer} from "@reduxjs/toolkit/src/devtoolsExtension";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    classes: classSlice.reducer,
    post: postSlice.reducer,
    test: testSlice.reducer,
  },
  devTools: process.browser,
  // ,
  // devTools: false,
  // enhancers: [devToolsEnhancer({ realtime: true, port: 8000 })],
});

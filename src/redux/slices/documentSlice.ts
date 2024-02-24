import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DocumentState {
  rootPageId: string | null;
}

const initialState: DocumentState = {
  rootPageId: null,
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setRootPageId: (state, action: PayloadAction<string>) => {
      state.rootPageId = action.payload;
    },
  },
});

export const { setRootPageId } = documentSlice.actions;
// export const getRootPageId = (state: any) => state.document.rootPageId;
export default documentSlice.reducer;

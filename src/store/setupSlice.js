import { createSlice } from "@reduxjs/toolkit";

const setupSlice = createSlice({
  name: "setup",
  initialState: { items: [], totalAmount: 0 },
  reducers: {
    function(state, action) {
      // do something
    },
  },
});

export const setupActions = setupSlice.actions;
export default setupSlice.reducer;

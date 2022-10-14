import { createSlice } from '@reduxjs/toolkit';

const setupSlice = createSlice({
  name: 'setup',
  initialState: { userId: null, username: null, email: null, role: null },
  reducers: {
    setEmail(state, action) {
      // do something
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;

      // console.log(action.payload);
      // console.log(state.userId);
      // console.log(state.username);
      // console.log(state.email);
      // console.log(state.role);
    },
  },
});

export const setupActions = setupSlice.actions;
export default setupSlice.reducer;

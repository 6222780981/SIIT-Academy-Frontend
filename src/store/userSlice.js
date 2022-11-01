import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { userId: undefined, username: undefined, email: undefined, role: undefined, photoURL: undefined },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.photoURL = action.payload.photoURL;
    },
    resetUser(state, action) {
      state.userId = undefined;
      state.username = undefined;
      state.email = undefined;
      state.role = undefined;
      state.photoURL = undefined;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

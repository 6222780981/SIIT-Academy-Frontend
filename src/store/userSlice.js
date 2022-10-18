import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { userId: undefined, username: undefined, email: undefined, role: undefined },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    resetUser(state, action) {
      state.userId = undefined;
      state.username = undefined;
      state.email = undefined;
      state.role = undefined;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

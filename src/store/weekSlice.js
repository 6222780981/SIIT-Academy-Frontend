import { createSlice } from '@reduxjs/toolkit';

const weekSlice = createSlice({
  name: 'week',
  initialState: { weekArr: [], currentWeekId: undefined },
  reducers: {
    setWeekArr(state, action) {
      state.weekArr = action.payload;
    },
    setCurrentWeekId(state, action) {
      state.currentWeekId = action.payload;
    },
    resetStates(state, action) {
      state.weekArr = [];
      state.currentWeekId = undefined;
    },
  },
});

export const weekActions = weekSlice.actions;
export default weekSlice.reducer;

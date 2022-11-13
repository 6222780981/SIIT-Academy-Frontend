import { createSlice } from '@reduxjs/toolkit';

const weekSlice = createSlice({
  name: 'week',
  initialState: { weekArr: [], currentWeekId: undefined },
  reducers: {
    setWeekArr(state, action) {
      const weekArr = action.payload;

      state.weekArr = weekArr;

      if (weekArr.length > 0) {
        state.currentWeekId = weekArr[0].week_id;
      } else {
        state.currentWeekId = undefined;
      }
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

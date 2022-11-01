import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import weekReducer from './weekSlice';

const store = configureStore({
  reducer: { user: userReducer, week: weekReducer },
});

export default store;

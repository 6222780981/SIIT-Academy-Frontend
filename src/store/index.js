import { configureStore } from '@reduxjs/toolkit';

import setupReducer from './setupSlice';

const store = configureStore({
  reducer: { setup: setupReducer },
});

export default store;

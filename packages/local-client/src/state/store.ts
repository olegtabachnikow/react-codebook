import { configureStore } from '@reduxjs/toolkit';
import cellsSlice from './cells-slice/cells-slice';
import bundleSlice from './bundle-slice/bundle-slice';

const reducer = {
  cells: cellsSlice,
  bundles: bundleSlice,
};

export const store = configureStore({ reducer: reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

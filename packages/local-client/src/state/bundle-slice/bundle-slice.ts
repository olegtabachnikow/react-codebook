import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BundleAction, BundleState } from '../../types/types';
import bundle from '../../bundler';
import { AppDispatch } from '../store';

const initialState: BundleState = {};

export const createBundle = createAsyncThunk<
  BundleAction,
  { code: string; cellId: string },
  { dispatch?: AppDispatch }
>('bundle/create', async ({ code, cellId }) => {
  const bundledCode = await bundle(code);
  const result: BundleAction = { ...bundledCode, cellId };
  return result;
});

const bundleSlise = createSlice({
  name: 'bundles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createBundle.pending.toString(),
      (state: BundleState, action: PayloadAction<BundleAction>) => {
        if (action.payload) {
          state[action.payload.cellId] = {
            loading: true,
            code: action.payload.code,
            err: action.payload.err,
          };
        }
      }
    );
    builder.addCase(
      createBundle.fulfilled.toString(),
      (state: BundleState, action: PayloadAction<BundleAction>) => {
        if (action.payload) {
          state[action.payload.cellId] = {
            loading: false,
            code: action.payload.code,
            err: action.payload.err,
          };
        }
      }
    );
    builder.addCase(
      createBundle.rejected.toString(),
      (state: BundleState, action: PayloadAction<BundleAction>) => {
        if (action.payload) {
          state[action.payload.cellId] = {
            loading: false,
            code: action.payload.code,
            err: action.payload.err,
          };
        }
      }
    );
  },
});

export default bundleSlise.reducer;

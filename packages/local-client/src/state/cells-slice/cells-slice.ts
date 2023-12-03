import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type {
  CellState,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAction,
  Cell,
} from '../../types/types';
import { RootState } from '../store';

interface RejectWithValue {
  message: string;
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export const fetchCells = createAsyncThunk<
  Cell[],
  void,
  { rejectValue: RejectWithValue }
>('cells/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data }: { data: Cell[] } = await axios.get('/cells');
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error: AxiosError = err;
      return rejectWithValue({ message: error.message });
    }
    throw err;
  }
});

export const saveCells = createAsyncThunk<
  CellState,
  void,
  { rejectValue: RejectWithValue }
>('cells/save', async (_, { getState, rejectWithValue }) => {
  const { cells } = getState() as RootState;
  const { data, order } = cells;
  const cellList = order.map((id: string) => data[id]);
  try {
    await axios.post('/cells', { cells: cellList });
    return cells;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error: AxiosError = err;
      return rejectWithValue({ message: error.message });
    }
    throw err;
  }
});

const cellSlise = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    updateCell(state: CellState, action: PayloadAction<UpdateCellAction>) {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell(state: CellState, action: PayloadAction<DeleteCellAction>) {
      const { id } = action.payload;
      state.order = [...state.order.filter((el) => el !== id)];
      delete state.data[id];
    },
    insertCell(state: CellState, action: PayloadAction<InsertCellAction>) {
      const { id, type } = action.payload;
      const cell: Cell = {
        id: randomId(),
        type,
        content: type === 'code' ? 'const a = 1' : 'Click to edit',
      };
      state.data[cell.id] = cell;

      const index = state.order.findIndex((itemId) => itemId === id);

      if (index === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
    moveCell(state: CellState, action: PayloadAction<MoveCellAction>) {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((itemId) => itemId === id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCells.pending, (state: CellState) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(
        fetchCells.fulfilled,
        (state: CellState, action: PayloadAction<Cell[]>) => {
          state.loading = false;
          state.order = action.payload.map((cell) => cell.id);
          state.data = action.payload.reduce(
            (acc, cell) => {
              acc[cell.id] = cell;
              return acc;
            },
            {} as CellState['data']
          );
        }
      ),
      builder.addCase(
        fetchCells.rejected,
        (
          state: CellState,
          action: PayloadAction<RejectWithValue | undefined>
        ) => {
          state.loading = false;
          if (action.payload?.message) {
            state.error = action.payload?.message;
            return;
          }
          state.error = 'Something goes wrong';
        }
      ),
      builder.addCase(saveCells.pending, (state: CellState) => {
        state.error = null;
      }),
      builder.addCase(
        saveCells.fulfilled,
        (state: CellState, action: PayloadAction<CellState>) => {
          state.error = null;
          state = action.payload;
        }
      ),
      builder.addCase(
        saveCells.rejected,
        (
          state: CellState,
          action: PayloadAction<RejectWithValue | undefined>
        ) => {
          state.loading = false;
          if (action.payload?.message) {
            state.error = action.payload?.message;
            return;
          }
          state.error = 'Something goes wrong';
        }
      );
  },
});

export const { updateCell, deleteCell, insertCell, moveCell } =
  cellSlise.actions;
export default cellSlise.reducer;

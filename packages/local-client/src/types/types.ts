type CellTypes = 'code' | 'markdown';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

export interface UpdateCellAction {
  id: string;
  content: string;
}

export interface DeleteCellAction {
  id: string;
}

export interface MoveCellAction {
  id: string;
  direction: 'up' | 'down';
}

export interface InsertCellAction {
  id: string | null;
  type: CellTypes;
}

export interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

export interface BundleAction {
  cellId: string;
  code: string;
  err: string;
}

export interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

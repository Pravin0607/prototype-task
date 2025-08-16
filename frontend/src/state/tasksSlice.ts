import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  is_completed: boolean;
}

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTasks, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;

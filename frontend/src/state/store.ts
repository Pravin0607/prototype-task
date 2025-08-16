

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import sessionReducer from './sessionSlice';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    session: sessionReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

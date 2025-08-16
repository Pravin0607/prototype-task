import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  isAuthenticated: boolean;
  accessToken: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const initialState: SessionState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login(state, action: PayloadAction<{ accessToken: string; user: any }>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuthenticated } = sessionSlice.actions;
export default sessionSlice.reducer;

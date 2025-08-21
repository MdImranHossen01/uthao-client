import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@/types';

type AuthState = {
  user: TUser | null;
  token: string | null;
};

// Function to load state from localStorage
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) {
      return { user: null, token: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { user: null, token: null };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: TUser; token:string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Save state to localStorage
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      // Clear state from localStorage
      localStorage.removeItem('auth');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
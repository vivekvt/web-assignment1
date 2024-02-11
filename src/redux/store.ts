import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  session: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
      state.authenticated = true;
    },
    removeSession: (state) => {
      state.session = null;
      state.authenticated = false;
    },
  },
});

// Export the actions generated by createSlice
export const { setSession, removeSession } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

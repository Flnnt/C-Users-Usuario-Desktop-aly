import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  role: null, // 'patient', 'doctor', 'admin'
  isAuthenticated: false,
  isVerified: false,
  verificationData: null,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      state.isAuthenticated = true;
    },
    setVerificationData: (state, action) => {
      state.verificationData = action.payload;
    },
    setVerified: (state) => {
      state.isVerified = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isVerified = false;
      state.verificationData = null;
      state.error = null;
    },
  },
});

export const { 
  setCredentials, 
  setVerificationData, 
  setVerified, 
  setLoading, 
  setError, 
  logout 
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsVerified = (state) => state.auth.isVerified;
export const selectVerificationData = (state) => state.auth.verificationData;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
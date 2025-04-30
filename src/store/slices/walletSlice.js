import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  transactions: [],
  achievements: [],
  pendingRewards: [],
  loading: false,
  error: null
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    addPoints: (state, action) => {
      state.balance += action.payload;
    },
    deductPoints: (state, action) => {
      state.balance -= action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addAchievement: (state, action) => {
      state.achievements.push(action.payload);
    },
    setAchievements: (state, action) => {
      state.achievements = action.payload;
    },
    addPendingReward: (state, action) => {
      state.pendingRewards.push(action.payload);
    },
    removePendingReward: (state, action) => {
      state.pendingRewards = state.pendingRewards.filter(
        reward => reward.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setBalance,
  addPoints,
  deductPoints,
  addTransaction,
  setTransactions,
  addAchievement,
  setAchievements,
  addPendingReward,
  removePendingReward,
  setLoading,
  setError
} = walletSlice.actions;

export default walletSlice.reducer;

// Selectors
export const selectBalance = (state) => state.wallet.balance;
export const selectTransactions = (state) => state.wallet.transactions;
export const selectAchievements = (state) => state.wallet.achievements;
export const selectPendingRewards = (state) => state.wallet.pendingRewards;
export const selectWalletLoading = (state) => state.wallet.loading;
export const selectWalletError = (state) => state.wallet.error;
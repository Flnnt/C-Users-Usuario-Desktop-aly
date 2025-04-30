import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatbotReducer from './slices/chatbotSlice';
import appointmentsReducer from './slices/appointmentsSlice';
import walletReducer from './slices/walletSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chatbot: chatbotReducer,
    appointments: appointmentsReducer,
    wallet: walletReducer,
  },
});

export default store;
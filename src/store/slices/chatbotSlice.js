import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversation: [],
  currentSymptoms: [],
  uploadedImages: [],
  audioEnabled: false,
  selectedLanguage: 'es',
  diagnosis: null,
  suggestedFacility: null,
  isProcessing: false,
  error: null
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.conversation.push(action.payload);
    },
    addSymptom: (state, action) => {
      state.currentSymptoms.push(action.payload);
    },
    removeSymptom: (state, action) => {
      state.currentSymptoms = state.currentSymptoms.filter(
        symptom => symptom.id !== action.payload
      );
    },
    addImage: (state, action) => {
      state.uploadedImages.push(action.payload);
    },
    removeImage: (state, action) => {
      state.uploadedImages = state.uploadedImages.filter(
        image => image.id !== action.payload
      );
    },
    toggleAudio: (state) => {
      state.audioEnabled = !state.audioEnabled;
    },
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setDiagnosis: (state, action) => {
      state.diagnosis = action.payload;
    },
    setSuggestedFacility: (state, action) => {
      state.suggestedFacility = action.payload;
    },
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetChat: (state) => {
      state.conversation = [];
      state.currentSymptoms = [];
      state.uploadedImages = [];
      state.diagnosis = null;
      state.suggestedFacility = null;
      state.error = null;
    }
  }
});

export const {
  addMessage,
  addSymptom,
  removeSymptom,
  addImage,
  removeImage,
  toggleAudio,
  setLanguage,
  setDiagnosis,
  setSuggestedFacility,
  setProcessing,
  setError,
  resetChat
} = chatbotSlice.actions;

export default chatbotSlice.reducer;

// Selectors
export const selectConversation = (state) => state.chatbot.conversation;
export const selectCurrentSymptoms = (state) => state.chatbot.currentSymptoms;
export const selectUploadedImages = (state) => state.chatbot.uploadedImages;
export const selectAudioEnabled = (state) => state.chatbot.audioEnabled;
export const selectSelectedLanguage = (state) => state.chatbot.selectedLanguage;
export const selectDiagnosis = (state) => state.chatbot.diagnosis;
export const selectSuggestedFacility = (state) => state.chatbot.suggestedFacility;
export const selectIsProcessing = (state) => state.chatbot.isProcessing;
export const selectChatbotError = (state) => state.chatbot.error;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  selectedFacility: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  facilities: [],
  loading: false,
  error: null,
  filters: {
    specialty: '',
    distance: null,
    rating: null
  }
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(app => app.id !== action.payload);
    },
    setSelectedFacility: (state, action) => {
      state.selectedFacility = action.payload;
    },
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    setFacilities: (state, action) => {
      state.facilities = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetAppointmentForm: (state) => {
      state.selectedFacility = null;
      state.selectedDoctor = null;
      state.selectedDate = null;
      state.selectedTime = null;
    }
  }
});

export const {
  setAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  setSelectedFacility,
  setSelectedDoctor,
  setSelectedDate,
  setSelectedTime,
  setFacilities,
  setFilters,
  setLoading,
  setError,
  resetAppointmentForm
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

// Selectors
export const selectAppointments = (state) => state.appointments.appointments;
export const selectSelectedFacility = (state) => state.appointments.selectedFacility;
export const selectSelectedDoctor = (state) => state.appointments.selectedDoctor;
export const selectSelectedDate = (state) => state.appointments.selectedDate;
export const selectSelectedTime = (state) => state.appointments.selectedTime;
export const selectFacilities = (state) => state.appointments.facilities;
export const selectFilters = (state) => state.appointments.filters;
export const selectAppointmentsLoading = (state) => state.appointments.loading;
export const selectAppointmentsError = (state) => state.appointments.error;
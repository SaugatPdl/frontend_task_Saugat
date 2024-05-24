import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  status: 'idle',
  error: null
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    fetchServicesStart(state) {
      state.status = 'loading';
    },
    fetchServicesSuccess(state, action) {
      state.status = 'succeeded';
      state.services = action.payload;
    },
    fetchServicesFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const {
  fetchServicesStart,
  fetchServicesSuccess,
  fetchServicesFailure
} = servicesSlice.actions;

export default servicesSlice.reducer;

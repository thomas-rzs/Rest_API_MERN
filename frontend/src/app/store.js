import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sensorReducer from '../features/sensors/sensorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sensors: sensorReducer, 
  },
});

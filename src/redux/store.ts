import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/propertySlice';
import authReducer from './slices/authSlice';
import propertyReducer from './slices/propertySlice';
import appointmentReducer from './slices/appointmentSlice';
import loaderReducer from './slices/loaderSlice'

export const store = configureStore({
    reducer: {
        example: exampleReducer,
        auth: authReducer,
        properties: propertyReducer,
        appointments: appointmentReducer,
        loader: loaderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

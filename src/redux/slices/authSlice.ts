import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState: AuthState = {
    isAuthenticated: false,
    userId: null,
    email: null,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            return {
                userId: action.payload.userId,
                email: action.payload.email,
                role: action.payload.role,
            };
        },
        loginSuccess(state, action: PayloadAction<AuthState>) {
            return {
                userId: action.payload.userId,
                email: action.payload.email,
                role: action.payload.role,
            };
        },
        logout() {
            return {
                isAuthenticated: false,
                userId: null,
                email: null,
                role: null,
            };

        }
    }
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

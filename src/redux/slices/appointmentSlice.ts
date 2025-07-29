import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
    id: number;
    propertyId: number;
    customer: string;
    date: string;
}

interface AppointmentState {
    list: Appointment[];
}

const initialState: AppointmentState = {
    list: [],
};

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        setAppointments(state, action: PayloadAction<Appointment[]>) {
            state.list = action.payload;
        },
        addAppointment(state, action: PayloadAction<Appointment>) {
            state.list.push(action.payload);
        },
    },
});

export const { setAppointments, addAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Property {
    id: number;
    title: string;
    location: string;
}

interface PropertyState {
    list: Property[];
}

const initialState: PropertyState = {
    list: [],
};

const propertySlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setProperties(state, action: PayloadAction<Property[]>) {
            state.list = action.payload;
        },
        addProperty(state, action: PayloadAction<Property>) {
            state.list.push(action.payload);
        },
    },
});

export const { setProperties, addProperty } = propertySlice.actions;
export default propertySlice.reducer;

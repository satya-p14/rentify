import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

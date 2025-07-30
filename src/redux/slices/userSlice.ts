import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
    users: [],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        }
    },
});

export const { setUsers, } = userSlice.actions;
export default userSlice.reducer;

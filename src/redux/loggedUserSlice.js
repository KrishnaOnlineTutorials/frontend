import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    role: localStorage.getItem('role') || null,
}

const loggedUserSlice = createSlice({
    name: 'loggedUserSlice',
    initialState,
    reducers: {
        updateUserLogStatus: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            if (action.payload.role !== undefined) {
                state.role = action.payload.role;
            }
            // Store token and role in localStorage
            if (action.payload.isLoggedIn) {
                localStorage.setItem('role', action.payload.role);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
            }
        }
    }
})

export const { updateUserLogStatus } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
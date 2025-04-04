import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false
}

const loggedUserSlice = createSlice({
    name: 'loggedUserSlice',
    initialState,
    reducers: {
        updateUserLogStatus: (state, action) => {
            if (typeof action.payload === 'boolean') {
                state.isLoggedIn = action.payload;
            }
        }
    }
})

export const { updateUserLogStatus } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
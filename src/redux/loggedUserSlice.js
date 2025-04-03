import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false
}

const loggedUserSlice = createSlice({
    name: 'loggedUserSlice',
    initialState,
    reducers: {
        updateUserLogStatus: (state, action) => {
            // const { field, value } = action.payload;
            // state[field] = value
            console.log("Updating user login status");
            state.isLoggedIn = action.payload;
        }
    }
})

export const { updateUserLogStatus } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
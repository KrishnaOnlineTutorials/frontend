import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateForm: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value
        }
    }
})

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
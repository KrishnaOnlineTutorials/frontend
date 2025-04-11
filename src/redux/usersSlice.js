import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_BASE_URL from '../apiConfig';

// Async thunk to fetch users from the backend
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const usersList = await response.json();
        return usersList; // Return the fetched users
    } catch (error) {
        return rejectWithValue(error.message); // Handle errors
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [], // List of users
        loading: false, // Loading state
        error: null, // Error state
    },
    reducers: {
        // Reducer to clear the users list (optional)
        clearUsersList: (state) => {
            state.usersList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.usersList = action.payload; // Update the users list
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set the error message
            });
    },
});

export const { clearUsersList } = usersSlice.actions; // Export actions
export default usersSlice.reducer; // Export the reducer
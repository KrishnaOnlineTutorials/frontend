import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import loggedUserReducer from './loggedUserSlice';
import usersReducer from './usersSlice';

const store = configureStore({
    reducer: {
        form: formReducer,
        loggedUser: loggedUserReducer,
        users: usersReducer,
    }
});

export default store;
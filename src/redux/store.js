import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import loggedUserReducer from './loggedUserSlice';

const store = configureStore({
    reducer: {
        form: formReducer,
        loggedUser: loggedUserReducer
    }
});

export default store;
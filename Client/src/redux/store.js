import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice.js'
import adminReducer from './slices/adminSlice.js'
import optionsReducer from './slices/optionsSlice.js'
import proReducer from './slices/proSlice.js'
import modalReducer from './slices/modalSlice.js'
import { reducer as formReducer } from 'redux-form'

const store = configureStore ({
    reducer: {
        options: optionsReducer,
        auth: authReducer,
        admin: adminReducer,
        pro: proReducer,
        modal: modalReducer,
        form: formReducer,
    },
    devTools: true,
});

export default store;


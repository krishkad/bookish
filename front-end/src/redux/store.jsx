import { configureStore } from "@reduxjs/toolkit";
import {userApiSlice} from './slices/services/apiSlice';
import { adminApiSlice } from "./slices/services/adminApiSlice";
import authReducer from "./slices/states/authSlice";
import adminReducer from "./slices/states/adminSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const authSlicePersistConfig = {
    key: 'userCred',
    storage
}

const adminPersistConfig = {
    key: 'adminCred',
    storage
}



const persistedAuthReducer = persistReducer(authSlicePersistConfig , authReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig ,adminReducer );

export const store  = configureStore ({

    reducer : {
        userCred: persistedAuthReducer,
        adminCred: persistedAdminReducer,
        [userApiSlice.reducerPath] : userApiSlice.reducer,
        [adminApiSlice.reducerPath] : adminApiSlice.reducer
    },

    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApiSlice.middleware , adminApiSlice.middleware)
});


export const persistedStore = persistStore(store);


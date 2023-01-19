import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./state";

import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { nftApi } from '../services/nftApi';
import { webitApi } from '../services/webitApi';

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

// const rootReducer = combineReducers({
//     crypto: {
//         [cryptoApi.reducerPath]: cryptoApi.reducer,
//         [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
//         [nftApi.reducerPath]: nftApi.reducer,
//         [webitApi.reducerPath]: webitApi.reducer,
//     },
//     login: persistedReducer,
// })

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export default store;
// export default configureStore({
//     reducer: {
//         [cryptoApi.reducerPath]: cryptoApi.reducer,
//         [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
//         [nftApi.reducerPath]: nftApi.reducer,
//         [webitApi.reducerPath]: webitApi.reducer,
//     }, 
    // persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //     serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    // }),
        
// });
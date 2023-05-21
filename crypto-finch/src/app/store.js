import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import { createStore } from 'redux'
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from "./state";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { nftApi } from '../services/nftApi';
import { webitApi } from '../services/webitApi';

// const persistConfig = { key: "root", storage, version: 1 };
// const persistedReducer = persistReducer(persistConfig, authReducer);

// const rootReducer = combineReducers({
//     persisted: persistedReducer,
//     crypto: cryptoApi.reducer,
//     cryptoNews: cryptoNewsApi.reducer,
//     nft: nftApi.reducer,
//     webit: webitApi.reducer,
// })

// const otherReducers = {
//     [cryptoApi.reducerPath]: cryptoApi.reducer,
//     [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
//     [nftApi.reducerPath]: nftApi.reducer,
//     [webitApi.reducerPath]: webitApi.reducer,
// };

// const combinedReducers = {
//     ...persistedReducer.reducer,
//     ...otherReducers,
//   };
  
//   const store = configureStore({
//     reducer: {
//         ...cryptoApi.reducer,
//         ...cryptoNewsApi.reducer,
//         ...nftApi.reducer,
//         ...webitApi.reducer,
//         ...persistedReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//     .concat(cryptoApi.middleware)
//     .concat(cryptoNewsApi.middleware)
//     .concat(nftApi.middleware)
//     .concat(webitApi.middleware)
//     .concat(getDefaultMiddleware({
//         serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//     })),
//   });

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//         serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//     }),
// });

// const rootReducer = combineReducers({
//     authReducer,
//     // [cryptoApi.reducerPath]: cryptoApi.reducer,
//     crypto: cryptoApi.reducer,
//     // cryptoNews: cryptoNewsApi.reducer,
//     // nft: nftApi.reducer,
//     // webit: webitApi.reducer,
// })

export default configureStore({
    reducer: {
                [cryptoApi.reducerPath]: cryptoApi.reducer,
                [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
                [nftApi.reducerPath]: nftApi.reducer,
                [webitApi.reducerPath]: webitApi.reducer,
            }, 
            middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
            .concat(cryptoApi.middleware)
            .concat(cryptoNewsApi.middleware)
            .concat(nftApi.middleware)
            .concat(webitApi.middleware),
                 
    // middleware: (getDefault) => getDefault()
    // .concat(cryptoApi.middleware),
  });
//   setupListeners(store.dispatch);

// export default store;
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
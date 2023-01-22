import React from 'react'
import { createRoot } from "react-dom/client";
import { combineReducers } from 'redux';
import "./index.css";
import App from "./App";
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import authReducer from './app/state';
import { configureStore } from "@reduxjs/toolkit";
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
import { PersistGate } from "redux-persist/integration/react";

import { cryptoApi } from './services/cryptoApi';
import { cryptoNewsApi } from './services/cryptoNewsApi';
import { nftApi } from './services/nftApi';
import { webitApi } from './services/webitApi';

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

const rootReducer = combineReducers({
    persisted: persistedReducer,
    crypto: cryptoApi.reducer,
    cryptoNews: cryptoNewsApi.reducer,
    nft: nftApi.reducer,
    webit: webitApi.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});


// import store from './app/store';
import 'antd/dist/antd.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </Router>
);




{/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
*/}
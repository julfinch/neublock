import React from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
// import authReducer from './app/state';
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
// import { cryptoApi } from './services/cryptoApi';
// import { cryptoNewsApi } from './services/cryptoNewsApi';
// import { nftApi } from './services/nftApi';
// import { webitApi } from './services/webitApi';

// const rootPersistConfig = { key: "root", storage, version: 1,
// blacklist: ['crypto', 'cryptoNews', 'nft', 'webit'], };

// const authPersistConfig = { key: "auth", storage, version: 1 };
// console.log('authPersistConfig', authPersistConfig)

// const authPersistedReducer = persistReducer(authPersistConfig, authReducer)

// export const rootReducer = combineReducers({
//     auth: persistReducer(authPersistConfig, authReducer),
//     [cryptoApi.reducerPath]: cryptoApi.reducer,
//     [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
//     [nftApi.reducerPath]: nftApi.reducer,
//     [webitApi.reducerPath]: webitApi.reducer,
// });
// console.log('rootReducer', rootReducer)
// console.log('authPersistedReducer', authPersistedReducer)
// console.log('cryptoApi.reducer', cryptoApi.reducer)
// console.log('cryptoNewsApi.reducer', cryptoNewsApi.reducer)
// console.log('nftApi.reducer', nftApi.reducer)
// console.log('webitApi.reducer', webitApi.reducer)


// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
// console.log('persistedReducer for rootReducer', persistedReducer)

// const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== 'production',
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(cryptoApi.middleware).concat(cryptoNewsApi.middleware).concat(nftApi.middleware).concat(webitApi.middleware),
// });

// console.log('store', store)



import store from './app/store';
import 'antd/dist/antd.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

// root.render(
//   <Router>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistStore(store)}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </Router>
// );


{/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
*/}
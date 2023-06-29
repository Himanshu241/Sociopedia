import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {persistGate} from 'redux-persist/integration/react';
import { getDefaultNormalizer } from '@testing-library/react';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {key: "root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
    
})

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
        <App/>
        </PersistGate>
        </Provider>
    
    </React.StrictMode>
);
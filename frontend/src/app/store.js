import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import themeReducer from './theme/themSlice.js'

const rootReducer=combineReducers({
    theme:themeReducer,
});

const persistConfig={
    key:'root',
    storage,
    version:1
};

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}),

});

export const persistor=persistStore(store)
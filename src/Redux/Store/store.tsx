import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query"; // Ensure correct import path
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "../Service/apiSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["api"],
};

export const rootReducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      apiSlice.middleware, // Ensure query middleware comes after other middleware
    ]),
  devTools: true,
});

setupListeners(store.dispatch);

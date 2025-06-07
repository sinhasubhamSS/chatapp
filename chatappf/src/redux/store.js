// import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import userReducer from "./userSlice";
// import messageReducer from "./messageSlice";
// import socketSlice from "./socketSlice";
// import {
    
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//      blacklist:['socket'],
//   }
//   const rootReducer=combineReducers( {
//     user: userReducer,
//     message:messageReducer,
//     socket:socketSlice
    

// })
//   const persistedReducer = persistReducer(persistConfig, rootReducer)
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: true
//     }),
// });
// export default store;


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import socketSlice from "./socketSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['socket'],  // Prevent persisting the socket slice
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

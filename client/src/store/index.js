import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import useReducer from './slices/user.slice';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  user: useReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer:persistedReducer,
  devTools:process.env.REACT_APP_ENV!=='production',
  middleware:[thunk]
})
export default store;
import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices/user.slice';

const store = configureStore({
  reducer:{
      user:useReducer
  }
})
export default store;
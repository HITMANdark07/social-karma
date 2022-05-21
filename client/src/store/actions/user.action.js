import api from '../api';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const googleLogin = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.post('/user/login', data)
        return response.data
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        toast.error(message)
        return rejectWithValue(message)
      }
    }
  )
import api from '../api';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getDonators = createAsyncThunk(
    'donators/user',
    async (role, { rejectWithValue }) => {
      try {
        const response = await api.get(`/user/list?role=${role}`);
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
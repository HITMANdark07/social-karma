import api from '../api';
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getWalletBalance = createAsyncThunk(
    'wallet/balance',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/user/wallet/${userId}`)
        return response.data;
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
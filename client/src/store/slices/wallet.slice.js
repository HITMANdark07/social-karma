import { createSlice } from '@reduxjs/toolkit';
import { getWalletBalance } from '../actions/wallet.action';
// Slice
const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
  },
  reducers: {

  },
  extraReducers:(builder) => {
    builder.addCase(getWalletBalance.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      builder.addCase(getWalletBalance.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.wallet = action.payload;
        state.isError = false;
        state.isLoading = false;
        state.message = '';
      })
      builder.addCase(getWalletBalance.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
  }
});
export default walletSlice.reducer;
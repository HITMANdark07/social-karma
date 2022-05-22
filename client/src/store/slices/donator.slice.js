import { createSlice } from '@reduxjs/toolkit';
import { getDonators } from '../actions/donators.action';
// Slice
const donatorSlice = createSlice({
  name: 'donators',
  initialState: {
    donators: [],
    total:0,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
  },
  reducers: {

  },
  extraReducers:(builder) => {
    builder.addCase(getDonators.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      builder.addCase(getDonators.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.donators = action.payload?.users;
        state.total = action.payload?.total;
        state.isError = false;
        state.isLoading = false;
        state.message = '';
      })
      builder.addCase(getDonators.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
  }
});
export default donatorSlice.reducer;
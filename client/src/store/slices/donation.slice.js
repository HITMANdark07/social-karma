import { createSlice } from '@reduxjs/toolkit';
import { getDonationsPerUser } from '../actions/donation.action';
// Slice
const donationSlice = createSlice({
  name: 'donation',
  initialState: {
    donations: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
  },
  reducers: {

  },
  extraReducers:(builder) => {
    builder.addCase(getDonationsPerUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
      })
      builder.addCase(getDonationsPerUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.donations = action.payload;
        state.isError = false;
        state.isLoading = false;
        state.message = '';
      })
      builder.addCase(getDonationsPerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
  }
});
export default donationSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { googleLogin } from '../actions/user.action';
// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    token:null
  },
  reducers: {
    // loginSuccess: (state, action) => {
    //   state.user = action.payload;
    // },
    logout: (state) =>  {
      state.user = null;
      state.token =null;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(googleLogin.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
        state.message = ''
      })
      builder.addCase(googleLogin.fulfilled, (state, action) => {
        state.isSuccess = true
        state.token = action.payload?.token
        state.user = action.payload?.user
        state.isError = false
        state.isLoading = false
        state.message = ''
      })
      builder.addCase(googleLogin.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isLoading = false
      })
  }
});
export const {logout} = userSlice.actions
export default userSlice.reducer;
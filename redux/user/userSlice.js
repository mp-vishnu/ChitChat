// src/user/userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser } from './userApi';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error: null,
  name:"try"
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUserToken;
export const selectError = (state) => state.user.error;
export const selectName = (state) => state.user.name;
export default userSlice.reducer;

// src/user/userSlice.js

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createUser, loginUser, getAllUser} from './authApi';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {jwtDecode} from 'jwt-decode';
// import 'core-js/stable/atob';
const initialState = {
  loggedInUserToken: null,
  userId: null,
  users: [],
  status: 'idle',
  reqstatus: 0,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (loginInfo, {rejectWithValue}) => {
    try {
      const response = await loginUser(loginInfo);
      console.log('response login <><><> ', response), '   <><><>';

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getAllUsersAsync = createAsyncThunk(
  'auth/getAllUser',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await getAllUser(userId);
      console.log('response login <><><> ', response), '   <><><>';

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const sendRequestAsync = createAsyncThunk(
  'auth/sendRequest',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await sendRequest(userData);
      console.log('response login <><><> ', response), '   <><><>';

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.loggedInUserToken = null;
      state.userId = null;
      // AsyncStorage.removeItem('authToken'); // Clear token from AsyncStorage
    },
    resetReqStatus: state => {
      state.reqstatus = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createUserAsync.pending, state => {
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
      .addCase(loginUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload.authtoken;
        state.userId = action.payload.id;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(getAllUsersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(sendRequestAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(sendRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.reqstatus = 1;
      })
      .addCase(sendRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const selectLoggedInUser = state => state.auth.loggedInUserToken;
export const selectUserId = state => state.auth.userId;
export const selectError = state => state.auth.error;
export const selectAllUsers = state => state.auth.users;
export const selectReqStatus = state => state.auth.reqstatus;
export const {logout} = userSlice.actions;
export default userSlice.reducer;

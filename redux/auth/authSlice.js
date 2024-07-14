// src/user/userSlice.js

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  createUser,
  loginUser,
  getAllUser,
  sendRequest,
  getRequest,
  acceptRequest,
  getAllFriends,
  sendMessage,
  fetchMessage,
} from './authApi';
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
  requests: [],
  friends: [],
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue({message: error.message});
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
export const getRequestAsync = createAsyncThunk(
  'auth/getRequest',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await getRequest(userId);
      console.log('requests <><><> ', response), '   <><><>';

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getAllFriendsAsync = createAsyncThunk(
  'auth/getAllFriends',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await getAllFriends(userId);
      console.log('response login <><><> ', response), '   <><><>';

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const acceptRequestAsync = createAsyncThunk(
  'auth/acceptRequest',
  async (reqInfo, {rejectWithValue}) => {
    console.log('req info 1 <><> ', reqInfo);
    try {
      const response = await acceptRequest(reqInfo);
      console.log('requests <><><> ', response), '   <><><>';

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const sendMessageAsync = createAsyncThunk(
  'auth/sendMessage',
  async (msgInfo, {rejectWithValue}) => {
    console.log('req info 1 <><> ', msgInfo);
    try {
      const response = await sendMessage(msgInfo);
      console.log('requests <><><> ', response), '   <><><>';

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getMessageAsync = createAsyncThunk(
  'auth/fetchMessage',
  async ({senderId, receiverId}, {rejectWithValue}) => {
    console.log('req info 1 <><> ', senderId, '<><> ', receiverId);
    try {
      const data = await fetchMessage(senderId, receiverId);
      console.log('chat ???<><><> ', data.data);
      return data.data;
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
        state.status = 'success';
        state.loggedInUserToken = action.payload.authtoken;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.message;
      })
      .addCase(loginUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.loggedInUserToken = action.payload.authtoken;
        state.userId = action.payload.id;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload.error;
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
      })
      .addCase(getRequestAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.requests = action.payload;
      })
      .addCase(getRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(acceptRequestAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(acceptRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.requests = action.payload;
      })
      .addCase(acceptRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(getAllFriendsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllFriendsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.friends = action.payload;
      })
      .addCase(getAllFriendsAsync.rejected, (state, action) => {
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
export const selectRequests = state => state.auth.requests;
export const selectFriends = state => state.auth.friends;
export const {logout} = userSlice.actions;
export default userSlice.reducer;

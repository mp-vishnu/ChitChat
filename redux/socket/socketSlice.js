// src/redux/socketSlice.js
import {createSlice} from '@reduxjs/toolkit';
import io from 'socket.io-client';

let socket;

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    connected: false,
    messages: [],
  },
  reducers: {
    connectSocket(state, action) {
      const {userId} = action.payload;
      socket = io('http://localhost:6000', {
        query: {userId},
      });
      state.connected = true;
    },
    disconnectSocket(state) {
      if (socket) socket.disconnect();
      state.connected = false;
    },
    receiveMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const {connectSocket, disconnectSocket, receiveMessage} =
  socketSlice.actions;

export const setupSocketListeners = () => dispatch => {
  if (!socket) return;
  socket.on('newMessage', msg => {
    dispatch(receiveMessage(msg));
  });
};

export const sendMessage = (senderId, receiverId, message) => {
  if (socket) socket.emit('sendMessage', {senderId, receiverId, message});
};

export default socketSlice.reducer;

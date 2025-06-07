// redux/socketActions.js
import { setonlineUsers } from "./userSlice";
import { connectSocket as connectSocketService } from '../services/socketServices';

// Thunk to handle socket connection and dispatch actions
export const connectSocket = (userId) => (dispatch) => {
  // Define a callback to handle online users data
  const onOnlineUsers = (onlineUsers) => {
    dispatch(setonlineUsers(onlineUsers));
  };

  // Initialize the socket and return the cleanup function
  const cleanupSocket = connectSocketService(userId, onOnlineUsers);

  return () => {
    cleanupSocket();
  };
};

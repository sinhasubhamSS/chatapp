// services/socketService.js
import io from 'socket.io-client';

// Function to initialize and return a socket connection
export const connectSocket = (userId, onOnlineUsers) => {
  const socket = io('http://localhost:8080', {
    query: { userId },
    transports: ['websocket'],
  });

  // Set up event listeners for WebSocket events
  socket.on('getOnlineUsers', onOnlineUsers);

  // Return a cleanup function to disconnect the socket
  return () => {
    socket.disconnect();
  };
};

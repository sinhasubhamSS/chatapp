import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
// import './index.css'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setonlineUsers } from './redux/userSlice'
import ProtectedRoute from './components/Protectedroutes'
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
])

function App() {

  const { authUser } = useSelector(store => store.user)
  const { socket } = useSelector(store => store.socket)
  const API = import.meta.env.VITE_BACKEND_SOCKET
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io(`${API}`, {
        query: { userId: authUser?._id },
        transports: ['websocket'], // optional, specify transport protocols
      });
      dispatch(setSocket(socket))
      socket.on('getOnlineUsers', (onlineusers) => {
        dispatch(setonlineUsers(onlineusers))
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null))
      }
    }
  }, [authUser, dispatch]);



  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App


// src/App.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { connectSocket } from "./redux/socketAction"// Import the Thunk action
// import HomePage from './components/HomePage';
// import Login from './components/Login';
// import Signup from './components/Signup';

// const router = createBrowserRouter([
//   { path: '/', element: <HomePage /> },
//   { path: '/register', element: <Signup /> },
//   { path: '/login', element: <Login /> },
// ]);

// function App() {
//   const { authUser } = useSelector((store) => store.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (authUser) {
//       // Call the Thunk action to connect the socket and get online users
//       const cleanupSocket = dispatch(connectSocket(authUser._id));

//       // Clean up the socket connection when the component unmounts or authUser changes
//       return () => {
//         cleanupSocket();
//       };
//     }
//   }, [authUser, dispatch]);

//   return (
//     <div className="p-4 h-screen flex items-center justify-center">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;

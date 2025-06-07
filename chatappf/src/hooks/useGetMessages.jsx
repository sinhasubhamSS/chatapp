import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'
const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user)
      const API = import.meta.env.VITE_BACKEND_URL;
    const dispatch=useDispatch()
    useEffect(() => {
       
        const fetchMessage = async () => {
            
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${API}/message/${selectedUser?._id}`);
                
                dispatch(setMessages(res.data))
            


            } catch (error) {
                console.log(`error at fetchmessaage ${error}`);
            }
        }
        fetchMessage()

    }, [selectedUser?._id])

}

export default useGetMessages
// import { useEffect } from "react";
// import debounce from 'lodash/debounce';
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from '../redux/messageSlice';

// const useGetMessages = () => {
//     const { selectedUser } = useSelector(store => store.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (!selectedUser?._id) return;

//         const fetchMessage = debounce(async () => {
//             try {
//                 axios.defaults.withCredentials = true;
//                 const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser._id}`);
//                 dispatch(setMessages(res.data));
//             } catch (error) {
//                 console.log(`error at fetchmessage ${error}`);
//             }
//         }, 300); // Debounce delay

//         fetchMessage();

//         return () => {
//             fetchMessage.cancel();
//         };
//     }, [selectedUser?._id, dispatch]);
// };

// export default useGetMessages;

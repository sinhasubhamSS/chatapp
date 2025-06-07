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

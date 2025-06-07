import {useEffect} from "react"
import{useDispatch, useSelector}  from 'react-redux'
import Messages from "../components/Messages"
import { setMessages } from "../redux/messageSlice"
const useGetRealTimeMessage=()=>{
    const{socket}=useSelector(store=>store.socket)
    const dispatch=useDispatch()
    const {messages}=useSelector(store=>store.message)
    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            dispatch(setMessages([...messages,newMessage]))

            
        })
        return()=>socket?.off("newMessage");

    },[setMessages,messages])

}
export default useGetRealTimeMessage
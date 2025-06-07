import axios from "axios"
import React, { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setOtherUsers } from "../redux/userSlice";
import { debounce } from 'lodash';
const useGetOtherUsers = () => {
    const dispatch = useDispatch()
  const API = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;

                const res = await axios.get(`${API}/user/`)
                //console.log(res); now instead of printing store in store so anyone can access it.
                //sending all other user data to store

                dispatch(setOtherUsers(res.data))//whatever is in the res.data will be send to action.payload of setOtherUsers ok
            } catch (error) {
                console.log(`error at fetchotherusers ${error}`);


            }
        }
        fetchOtherUsers();

    }, [dispatch])

}
export default useGetOtherUsers


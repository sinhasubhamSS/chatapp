import axios from "axios"
import React, { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setOtherUsers } from "../redux/userSlice";
import { debounce } from 'lodash';
const useGetOtherUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;

                const res = await axios.get(`http://localhost:8080/api/v1/user/`)
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

// import { useEffect } from 'react';
// import axios from "axios";
// import { useDispatch } from 'react-redux';
// import { setOtherUsers } from '../redux/userSlice';
// import { debounce } from 'lodash';

// const useGetOtherUsers = () => {
//     const dispatch = useDispatch();

//     // Define the debounced function outside of useEffect
//     const fetchOtherUsers = debounce(async () => {
//         try {
//             axios.defaults.withCredentials = true;
//             const res = await axios.get(`http://localhost:8080/api/v1/user/`);
//             dispatch(setOtherUsers(res.data));
//         } catch (error) {
//             console.log(`Error fetching other users: ${error}`);
//         }
//     }, 300); // Adjust the debounce delay as needed

//     useEffect(() => {
//         fetchOtherUsers(); // Call the debounced function

//         // Cleanup function to cancel any pending debounced calls if component unmounts
//         return () => {
//             fetchOtherUsers.cancel();
//         };
//     }, [dispatch]); // Dependency array to include dispatch

// };

// export default useGetOtherUsers;
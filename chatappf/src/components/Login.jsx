import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const API = import.meta.env.VITE_BACKEND_URL;
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/user/login`, user, {
                headers: {
                    "Content-Type": "application/json"

                },
                withCredentials: true
            });
            console.log(res);
            if (res?.data?._id) {
                navigate("/")
                dispatch(setAuthUser(res.data))

            }

        } catch (error) {

            toast.error(error?.response?.data?.message);

        }
        setUser({
            username: "",
            password: ""
        })
    }
    return (
        <div className='min-w-96 mx-auto'>
            <div className='w-full  font-semibold p-6 rounded-lg shadow-md  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center text-black'>Login</h1>
                <form onSubmit={onSubmitHandler} action=''>

                    <div className='my-2'>
                        <label className='label p-2'>
                            <span className='text-base label-text'>UserName</span>
                        </label>
                        <input
                            className=" w-full input input-bordered px-2 text-black border-2 h-10 rounded-lg"
                            type='text'
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder='UserName' />
                    </div>
                    <div className='my-2'>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input className=" w-full input input-bordered px-2 text-black border-2 h-10 rounded-lg"
                            type='password'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder='Password' />
                    </div>



                    <p className=' text-center mt-6  '>
                        Dont't have an account ?
                        <Link to="/register" className='ml-1 hover:underline hover:text-green-500'>
                            SignUp
                        </Link>
                    </p>


                    <div>
                        <button
                            type='submit'
                            className='  mt-6 btn btn-block btn-sm  border border-slate-700'>
                            <p className=''>Login</p>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
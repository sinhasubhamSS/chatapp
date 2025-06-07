import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast'

function Signup() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender })
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/user/register`, user, {
        headers: {
          "Content-Type": "application/json"

        },
        withCredentials: true
      });
      console.log(res);
      if (res?.data?.message) {
        navigate("/login")
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log("error at api call register");
      toast.error("Registration failed. Please try again.");

    }


    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    }
    )
  }
  return (
    <div className='min-w-96 mx-auto'>
      <div className='w-full  font-semibold p-6 rounded-lg shadow-md  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-black'>Signup</h1>
        <form onSubmit={onSubmitHandler} action=''>
          <div className='my-2'>
            <label className='label p-2'>
              <span className='text-base label-text'>FullName</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className=" w-full input input-bordered px-2 text-black border-2 h-10 rounded-lg"
              type='text' placeholder='FullName' />
          </div>
          <div className='my-2'>
            <label className='label p-2'>
              <span className='text-base label-text'>UserName</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className=" w-full input input-bordered px-2 text-black border-2 h-10 rounded-lg"
              type='text' placeholder='UserName' />
          </div>
          <div className='my-2'>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              className=" w-full input input-bordered px-2 text-black border-2 h-10 rounded-lg"
              type='text' placeholder='Password' />
          </div>
          <div className='my-2'>
            <label className='label p-2'>
              <span className='text-base label-text'>ConfirmPassword</span>
            </label>

            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className=" w-full input input-bordered px-2 text-black border-2 h-10 rounded-lg"
              type='text' placeholder='ConfirmPassword' />
          </div>
          <div className='flex  items-center my-4'>
            <div className='flex  items-center'>
              <p className='text-black'>Male</p>
              <input

                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}


                className="checkbox mx-2" />
            </div>
            <div className='flex  items-center '>
              <p className='text-black'>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}

                className="checkbox mx-2" />
            </div>
          </div>

          <p className=' text-center'>
            Already have an account ?
            <Link to="/login" className='ml-1 hover:underline hover:text-green-500'>
              SignIn
            </Link>
          </p>


          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>
              Signup
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Signup
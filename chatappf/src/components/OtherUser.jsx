import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setSelectedUser } from "../redux/userSlice"
function OtherUser({ user }) {
    // const user = props.user
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(store => store.user);
    const { onlineUsers } = useSelector(store => store.user);

    const selectedUserHandler = (user) => {

        dispatch(setSelectedUser(user));
    }
    const isOnline = onlineUsers ? onlineUsers.includes(user?._id) : false;

    return (

        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ?
                'bg-slate-700 hover:bg-slate-700  text-white' : ''} flex gap-2 items-center text-black hover:bg-slate-300 `}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className=' rounded-full w-12'>
                        <img src={user?.profilePhoto} alt="User-profile" />

                    </div>

                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2'>
                        <p>{user?.fullname}</p>
                    </div>

                </div>

            </div>
            <div className="divider my-0 py-0"></div>
        </>

    )
}

export default OtherUser
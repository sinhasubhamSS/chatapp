import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { setSelectedUser } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
function Messagecontainers() {
  const { selectedUser, authUser,onlineUsers } = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => dispatch(setSelectedUser(null))

  }, [])
  const isOnline = onlineUsers ? onlineUsers.includes(selectedUser?._id) : false;
  return (
    <>
      {selectedUser ? (
        <div className='md:min-w-[550px] flex flex-1 flex-col'>
          <div className='flex gap-2 items-center bg-zinc-600 p-2 mx-1'>
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
              <div className='rounded-full w-12'>
                {selectedUser ? <img src={selectedUser.profilePhoto} /> : ''}
              </div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='flex justify-between '>
                <p>{selectedUser?.fullname}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className='md:min-w-[550px] flex flex-1 flex-col justify-center items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-6"  '>
          <h1 className='capitalize text-4xl font-bold '>HI ,{authUser?.fullname}</h1>
          <h1 className=' text-2xl '>
            Let's start a conversation</h1>
        </div>

      )}
    </>
  );
}
export default Messagecontainers
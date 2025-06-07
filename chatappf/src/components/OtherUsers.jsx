import React from 'react'
import OtherUser from './OtherUser'
import "./scrollbar.css"

import { useSelector } from 'react-redux'

const OtherUsers = ({ filteredUsers }) => {
    

    const { otherUsers } = useSelector(store => store.user);
    if (!otherUsers || otherUsers.length === 0) {
        return <div>No users found.</div>;
    }//early return
    if (!filteredUsers || filteredUsers.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div className='scrollbar-custom overflow-auto h-64 flex-1 '>
            {filteredUsers?.map((user) => {
                return (
                    <OtherUser key={user?._id} user={user} />
                )
            })}

        </div>
    )
}

export default OtherUsers
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux';


function SingleMessage({ message }) {
    const scroll = useRef();
    const { authUser,selectedUser } = useSelector(store => store.user)
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })

    }, [message])
    const isMessageFromAuthUser = authUser?._id === message?.senderId;

    return (
        <div ref={scroll}  className={`chat ${isMessageFromAuthUser ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img

                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto:selectedUser?.profilePhoto} />
                </div>
            </div>
            <div className="chat-header">

                <time className="text-xs opacity-50   text-white">12:45</time>
            </div>
            <div className="chat-bubble">{message?.message}</div>

        </div>
    )
}

export default SingleMessage
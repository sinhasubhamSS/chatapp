import React from 'react'
import SingleMessage from './SingleMessage'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

function Messages() {
  
  useGetMessages();
  useGetRealTimeMessage()
  const { messages } = useSelector(store => store.message)
  if (!messages) {

    return <p>No messages to display.</p>
  }
  return (
    <div className='scrollbar-custom   rounded-sm flex-1 overflow-auto '>
      {
        messages.length > 0 ? (
          messages.map((message) => (
            <SingleMessage key={message._id} message={message} />
          ))
        ) : (
          <p>No messages available.</p>  // Handle case when messages array is empty
        )
      }

    </div>
  )
}

export default Messages
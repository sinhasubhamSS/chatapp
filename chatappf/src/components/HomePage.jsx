import React from 'react'
import Messagecontainers from './Messagecontainers'
import Sidebar from "./SideBar"
function HomePage() {
  return (
    <>
      <div className='flex  h-[300px]  sm:h-[450px] md:h-[550px] rounded-md overflow-hidden   bg-black  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100'>
        <Sidebar />
        <Messagecontainers />
      </div>
    </>
  )
}

export default HomePage
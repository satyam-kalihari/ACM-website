import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
      <div className="p-10 items-center flex flex-col">
          <Image src={"/images/room-icon.svg"} draggable={false} alt='room-icon' width={200} height={200}/>
          
           
        <h1 className='text-3xl'>
          Rooms for ACM
        </h1>
        <span>
          Select a room from the sidebar to get started.
        </span>
      </div>
    </div>
  )
}

export default page
import React from 'react'
import { CurrentRoomProvider } from '@/context/CurrentRoomContext'
import Sidebar from '@/components/Sidebar'
import { SocketProvider } from '@/context/SocketContext'


const RoomsLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <div className='flex h-screen'>
      <SocketProvider>
        <CurrentRoomProvider>
          <Sidebar />
          <div className='w-full'>
            {children}
          </div>
        </CurrentRoomProvider>
      </SocketProvider>
    </div>
  )
}

export default RoomsLayout
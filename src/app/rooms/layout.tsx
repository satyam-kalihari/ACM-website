"use client"

import React from 'react'
import { CurrentRoomProvider } from '@/context/CurrentRoomContext'
import { SocketProvider } from '@/context/SocketContext'
import SidebarContainer from '@/components/SidebarContainer'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
})


const RoomsLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <div className={`flex h-screen font-roboto ${roboto.variable}`}>
      <SocketProvider>
        <CurrentRoomProvider>
          <SidebarProvider>
            <SidebarContainer />
            <div className='w-full'>
              {children}
            </div>
          </SidebarProvider>
        </CurrentRoomProvider>
      </SocketProvider>
    </div>
  )
}

export default RoomsLayout
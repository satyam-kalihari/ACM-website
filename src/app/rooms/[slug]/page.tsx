"use client"

import ChatComponent from '@/components/ChatComponent'
import React, {useEffect} from 'react'
import { useCurrentRoom } from '@/context/CurrentRoomContext'
import { useParams, useRouter } from 'next/navigation'


const page = () => {
  const {currentRoom, setCurrentRoom} = useCurrentRoom();
  const { slug } = useParams()
  const router = useRouter()

  useEffect(() => {
    if(currentRoom?.slug !== slug) {
      router.push("/rooms")
    }
  },[])

  return (
    <div className='chat-room w-full h-full'>
      <ChatComponent />
    </div>
  )
}

export default page
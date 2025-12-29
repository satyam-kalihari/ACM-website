"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { useCurrentRoom } from '@/context/CurrentRoomContext';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@clerk/nextjs';

const ChatComponent = () => {

  const { isLoaded, user} = useUser()
  const [dbUser, setDbUser] = useState<any>()
  const [message, setMessage] = useState<String>("");
  const [messages, setMessages] = useState<{ author?: String, message?: String }[]>([]);
  const { currentRoom, setCurrentRoom } = useCurrentRoom();
  const socket = useSocket()

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/user/get-user")
    .then(res => res.json())
    .then(res => {setDbUser(res)})
    
  },[isLoaded, user])
  
  useEffect(() => {
    
    socket.on("room-message", handleRoomMessageListener)

    return () => {
      socket.off("room-message", handleRoomMessageListener)
    }
  }, [socket])
  
  const handleSend = () => {
    
    if (message.trim() !== "") {
        socket.emit("send-message", {roomId: currentRoom?._id, author: dbUser?.user?._id, msg: message})
      }
      setMessage("");
    }

    const handleRoomMessageListener = (data: any) => {
      setMessages((prev) => [...prev, data])
    }



  return (
    <div className='chat-container flex flex-col h-full w-full'>
      <header>

      </header>
      <div className='chat-box flex h-full w-full flex-col p-4 gap-2'>
        {messages.map((msg, index) => {
          return(
            <div key={index} className={`flex rounded p-2 ${dbUser?.user?._id === msg?.author ? 'self-end bg-black text-white':'self-start'}`}>{msg.message}</div>

          )
        })}
      </div>
      <div className='flex py-6 px-10 justify-center chat-input border-t gap-2'>
        <input className='border border-black w-full px-3 py-2 rounded shadow-2xs outline-0' type="text" placeholder='Chat here' onChange={(e) => setMessage(e.target.value)} value={message as string} />
        <Button onClick={handleSend} className='flex self-center'>Send</Button>
      </div>
    </div>
  )
}

export default ChatComponent
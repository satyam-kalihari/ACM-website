"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { useCurrentRoom } from '@/context/CurrentRoomContext';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@clerk/nextjs';
import { SidebarTrigger } from './ui/sidebar';

const ChatComponent = () => {

  const { isLoaded, user } = useUser()
  const [dbUser, setDbUser] = useState<any>()
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ author?: string, message?: string }[]>([]);
  const { currentRoom, setCurrentRoom } = useCurrentRoom();
  const socket = useSocket()

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/user/get-user")
      .then(res => res.json())
      .then(res => { setDbUser(res) })

  }, [isLoaded, user])

  const fetchMessages = async (body: any) => {

    const response = await fetch("/api/message/get-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await response.json();

    if (data.success) {

      const cont = data.content
        .slice()
        .reverse()
        .map((m: any) => ({
          author: m.sender,
          message: m.content
        }));

      setMessages(cont);

    }
    console.log(data)
  }

  useEffect(() => {
    fetchMessages({
      userId: dbUser?.user?._id,
      roomId: currentRoom?._id
    })
  }, [dbUser?.user])

  const handleRoomMessageListener = (data: any) => {
    setMessages((prev) => [...prev, data])
  }

  useEffect(() => {

    if (!socket) return;

    socket.on("room-message", handleRoomMessageListener)

    return () => {
      socket.off("room-message", handleRoomMessageListener)
    }
  }, [socket])

  const handleSend = async () => {
    
    if (message.trim() !== "") {
      
      const res = await fetch("/api/message/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            roomId: currentRoom?._id,
            senderId: dbUser?.user?._id,
            content: message,
            
          })
        }
      )
      setMessage("");

      const data = await res.json();
      if (data.success) {
        socket.emit("send-message", { roomId: currentRoom?._id, author: dbUser?.user?._id, msg: message })

      } else {
        console.log(data)
      }
    }
  }

  useEffect(() => {
  const chatBox = document.querySelector('.chat-box');
  chatBox?.scrollTo({ top: chatBox.scrollHeight });
}, [messages]);




  return (
    <div className='chat-container flex flex-col h-full'>
      <div className='flex min-w-full'>
        <SidebarTrigger className='h-full w-14 border-b rounded-none' />
        <header className='py-5 flex px-3 border border-b w-full'>
          <h1 className='text-2xl'>
            {currentRoom?.name}
          </h1>
        </header>
      </div>
      <div className='chat-box flex h-full w-full flex-col p-4 gap-2 min-w-0 overflow-y-auto'>
        {messages.map((msg, index) => {
          return (
            <div key={index} className={`flex rounded wrap-break-word p-2 ${dbUser?.user?._id === msg?.author ? 'self-end bg-black text-white' : 'self-start'}`}>{msg.message}</div>

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
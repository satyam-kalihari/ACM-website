"use client"

import React, { useEffect, useState, useRef } from 'react'
import { Button } from './ui/button';
import { useCurrentRoom } from '@/context/CurrentRoomContext';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@clerk/nextjs';
import { SidebarTrigger } from './ui/sidebar';
import { Hash, Users, Send, Smile, PlusCircle } from "lucide-react";

const ChatComponent = () => {

  const { isLoaded, user } = useUser()
  const [dbUser, setDbUser] = useState<any>()
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ author?: String, message?: String, timestamp?: string, senderName?: string }[]>([]);
  const { currentRoom, setCurrentRoom } = useCurrentRoom();
  const socket = useSocket()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/user/get-user")
      .then(res => res.json())
      .then(res => { setDbUser(res) })

  }, [isLoaded, user])

  useEffect(() => {

    socket.on("room-message", handleRoomMessageListener)

    return () => {
      socket.off("room-message", handleRoomMessageListener)
    }
  }, [socket])

  const handleSend = () => {
    if (message.trim() !== "") {
      // Add minimal mock data for immediate UI feedback if needed, 
      // but sticking to socket flow:
      socket.emit("send-message", {
        roomId: currentRoom?._id,
        author: dbUser?.user?._id,
        msg: message,
        // Sending extra metadata if server supports it, or we rely on client to rendering it locally
        senderName: user?.fullName || user?.username || "Start",
        timestamp: new Date().toISOString()
      })
    }
    setMessage("");
  }

  const handleRoomMessageListener = (data: any) => {
    // Inject mock timestamp/name if missing for now to match UI
    if (!data.timestamp) data.timestamp = new Date().toISOString();
    setMessages((prev) => [...prev, data])
  }

  // Mock function to generate random colors for avatars
  const getAvatarColor = (name: string) => {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    let hash = 0;
    if (!name) return colors[0];
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className='chat-container relative h-full w-full bg-white dark:bg-zinc-950 flex flex-col overflow-hidden'>
      {/* Header */}
      <header className='flex items-center justify-between py-3 px-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10 h-16'>
        <div className='flex items-center gap-2'>
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <Hash className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <div>
            <h1 className='text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2'>
              {currentRoom?.name || "Select a room"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">234 members</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search icon could go here */}
          <Button variant="outline" className="hidden md:flex items-center gap-2 rounded-full border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800">
            <Users className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300">Members</span>
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className='chat-box flex-1 w-full flex flex-col p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent pb-24'>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
            <Hash className="h-16 w-16 mb-4 opacity-20" />
            <p>Welcome to #{currentRoom?.name || "general"}!</p>
            <p className="text-sm">This is the start of the <span className="font-semibold">#{currentRoom?.name}</span> channel.</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isCurrentUser = dbUser?.user?._id === msg?.author;
            // Mocking name/avatar if not present in msg
            const senderName = msg.senderName || (isCurrentUser ? (user?.fullName || "You") : "User");
            const initials = senderName.split(" ").map((n: any) => n[0]).join("").substring(0, 2).toUpperCase();

            // Check if previous message was from same author to group them (optional refinement)
            const isSequence = index > 0 && messages[index - 1].author === msg.author;

            return (
              <div
                key={index}
                className={`flex gap-4 group hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 p-2 -mx-2 rounded transition-colors ${isSequence ? 'mt-0.5' : 'mt-4'} ${isCurrentUser ? 'flex-row-reverse' : ''}`}
              >
                {!isSequence ? (
                  <div className={`h-10 w-10 mt-1 rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0 ${getAvatarColor(senderName)}`}>
                    {initials}
                  </div>
                ) : (
                  <div className={`w-10 shrink-0 text-[10px] text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 pr-1 self-center ${isCurrentUser ? 'text-left pl-1' : 'text-right'}`}>
                    {formatTime(msg.timestamp)}
                  </div>
                )}

                <div className={`flex flex-col max-w-[70%] min-w-0 ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                  {!isSequence && (
                    <div className={`flex items-baseline gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                      <span className="font-semibold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
                        {senderName}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  <div className={`break-words leading-relaxed px-4 py-2 rounded-2xl ${isCurrentUser
                    ? 'bg-[#5865F2] text-white rounded-tr-none'
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-300 rounded-tl-none'
                    } ${isSequence ? '' : ''}`}>
                    {msg.message}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 z-20'>
        <div className='flex items-center gap-2 bg-gray-100 dark:bg-zinc-900 rounded-2xl px-2 py-2 border border-transparent focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 dark:focus-within:ring-purple-900 transition-all'>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full h-8 w-8">
            <PlusCircle className="h-5 w-5" />
          </Button>

          <input
            className='flex-1 bg-transparent px-2 py-1 outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400'
            type="text"
            placeholder={`Message #${currentRoom?.name || "general"}`}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            value={message as string}
          />

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full h-8 w-8">
              <Smile className="h-5 w-5" />
            </Button>
            {message.trim().length > 0 && (
              <Button onClick={handleSend} size="icon" className="bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full h-8 w-8 transition-all animate-in zoom-in duration-200">
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
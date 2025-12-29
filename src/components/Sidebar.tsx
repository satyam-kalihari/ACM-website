"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import socket from '@/socket/socket'
import { IRoom } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useCurrentRoom } from '@/context/CurrentRoomContext'
import { useRouter } from 'next/navigation'
import { useSocket } from '@/context/SocketContext'

const Sidebar = () => {

    const { isSignedIn, isLoaded, user } = useUser()
    const [rooms, setRooms] = React.useState<IRoom[]>()
    const { currentRoom, setCurrentRoom} = useCurrentRoom()
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()
    const socket = useSocket()

    useEffect(() => {
        socket.connect()

        socket.on("connect", () => {
            console.log("Connected")
        })

        return(() => {
            socket.off()
            socket.disconnect()
        })

    }, [])

    useEffect(() => {
        if (isLoaded && user?.id) {
            fetchRooms()
        }
    }, [isLoaded, user?.id])


    const fetchRooms = async () => {
        try {
            const response = await fetch('/api/user/get-rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clerkId: user?.id }),
            });
            const data = await response.json();
            if (data.success) {
                setRooms(data.rooms);
                setLoading(false)
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    }

    return (
        <div className='sidebar w-80 border px-2 py-3 '>
            <div className='heading mb-3'>
                <h1 className='text-2xl'>Rooms</h1>
            </div>

            <div className=''>

                <ul className='flex flex-col '>
                    {isLoading ? (<div>Loading...</div>) :
                        rooms?.map((room, index) => {

                            const handleClick = (event : any) => {
                                socket.emit("join-room", room);
                                socket.on("joined-successfully", (sRoom) => {
                                    setCurrentRoom(sRoom.room)
                                    router.push(`/rooms/${sRoom.room.slug}`);
                                })
                            }

                            return (
                                <li key={room.slug} onClick={handleClick} className='cursor-pointer hover:bg-black hover:text-white px-2 py-3 rounded'><button>{room.name}</button></li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
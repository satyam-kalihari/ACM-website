"use client"

import React, { useState, useEffect } from 'react'
import { useCurrentRoom } from '@/context/CurrentRoomContext'
import { useRouter } from 'next/navigation'
import { useSocket } from '@/context/SocketContext'
import { useRooms } from '@/hooks/useRooms'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import Link from 'next/link'


const SidebarContainer = () => {
    const { rooms, isLoading, error } = useRooms()
    const { currentRoom, setCurrentRoom } = useCurrentRoom()
    const router = useRouter()
    const socket = useSocket()

    useEffect(() => {
        socket.connect()

        socket.on("connect", () => {
            console.log("Connected")
        })

        return (() => {
            socket.off("connect")
            socket.disconnect()
        })

    }, [])



    return (
        <Sidebar>
            <SidebarHeader className='py-4 px-4'>
                <div className='flex items-center'>

                    <h1 className='text-2xl w-full'>
                        ACM Rooms
                    </h1>
                    <Link className='flex justify-self-end' href={'/'}>
                        <Image src={'/images/home-icon.svg'} width={30} height={30} alt='home-icon' />
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Rooms</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isLoading ? (<SidebarMenu>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuSkeleton showIcon />
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>) :
                                rooms?.map((room) => {

                                    const handleClick = (event: any) => {
                                        socket.emit("join-room", room);
                                        socket.on("joined-successfully", (sRoom) => {
                                            setCurrentRoom(sRoom.room)
                                            router.push(`/rooms/${sRoom.room.slug}`);
                                        })
                                    }

                                    return (
                                        <SidebarMenuItem key={room.slug}>
                                            <SidebarMenuButton className='h-16 
                                            cursor-pointer' onClick={handleClick}>
                                                <Image src={`/images/room-icon.svg`} width={40} height={40} alt='profile-img' />
                                                {room.name}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default SidebarContainer
"use client"
import React, { createContext, useContext } from "react"
import socket from "@/socket/socket"

const SocketContext = createContext(socket)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export const useSocket = () => useContext(SocketContext)
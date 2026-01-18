"use client"

import { ICurrentRoomContext, IRoom} from "@/types";
import { createContext, useState, useContext } from "react"

const CurrentRoomContext = createContext<ICurrentRoomContext | null>(null);

export function CurrentRoomProvider({children} : {children: React.ReactNode}) {

    const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null);

    const value : ICurrentRoomContext = {currentRoom, setCurrentRoom};

    return(
        <CurrentRoomContext.Provider value={value}>
            {children}
        </CurrentRoomContext.Provider>
    )
}

export function useCurrentRoom() {
    const context = useContext(CurrentRoomContext);
    if (!context) throw new Error("useCurrentRoom must be used within current room");
    return context;
}
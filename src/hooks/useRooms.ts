import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { IRoom } from '@/types'

export const useRooms = () => {

    const [isLoading, setLoading] = useState<boolean>(true);
    const { isSignedIn, isLoaded, user } = useUser();
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [error, setError] = useState();
    

    
    useEffect(() => {
        if (!user?.id && !isLoaded) return 


        if( user?.id && isLoaded){

            setLoading(true)

            fetch("/api/user/get-rooms", )
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRooms(data.rooms);
                    setLoading(false)
                } else {
                    setRooms([])
                    setLoading(false)
                }
            })
        }
    }, [user?.id, isLoaded, isSignedIn]);

    return {rooms, isLoading, error };

};
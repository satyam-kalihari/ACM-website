import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { IRoom } from "@/types";

export const useRooms = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isSignedIn, isLoaded, user } = useUser();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user?.id) {
      setLoading(false);
      setRooms([]);
      return;
    }

    let isMounted = true;

    const fetchRooms = async () => {
      try {
        setLoading((prev) => (!prev ? true : prev));

        const res = await fetch("/api/user/get-rooms");
        const data = await res.json();

        if (isMounted) {
          if (data.success) {
            setRooms(data.rooms);
          } else {
            setRooms([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching rooms:", err);
          setError(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRooms();

    return () => {
      isMounted = false;
    };
  }, [user?.id, isLoaded, isSignedIn]);

  return { rooms, isLoading, error };
};

"use client";

import React, { useState, useEffect } from "react";
import { useCurrentRoom } from "@/context/CurrentRoomContext";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketContext";
import { useRooms } from "@/hooks/useRooms";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Hash, Users } from "lucide-react";

const SidebarContainer = () => {
  const { rooms, isLoading, error } = useRooms();
  const { currentRoom, setCurrentRoom } = useCurrentRoom();
  const router = useRouter();
  const socket = useSocket();
  const [activeMembers, setActiveMembers] = useState(234); // Mock data for now

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected");
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return (
    <Sidebar className="border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <SidebarHeader className="py-4 px-4 sticky top-0 bg-white dark:bg-zinc-950 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms..."
            className="w-full bg-gray-100 dark:bg-zinc-900 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 dark:text-gray-200 dark:placeholder:text-gray-500 border-none"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-2 py-2 mb-2">
            <SidebarGroupLabel className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider">CHAT ROOMS</SidebarGroupLabel>
            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                <SidebarMenu>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              ) : (
                rooms?.map((room) => {
                  const isActive = currentRoom?.slug === room.slug;

                  const handleClick = (event: any) => {
                    socket.emit("join-room", room);
                    socket.once("joined-successfully", (sRoom) => {
                      setCurrentRoom(sRoom.room);
                      router.push(`/rooms/${sRoom.room.slug}`);
                    });
                  };

                  return (
                    <SidebarMenuItem key={room.slug} className="px-2 mb-1">
                      <SidebarMenuButton
                        className={`h-10 px-3 rounded-lg cursor-pointer transition-colors w-full justify-between group ${isActive
                            ? "bg-[#5865F2] hover:bg-[#4752C4] text-white"
                            : "hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-700 dark:text-gray-300"
                          }`}
                        onClick={handleClick}
                      >
                        <div className="flex items-center gap-3">
                          <Hash className={`h-5 w-5 ${isActive ? "text-white/70" : "text-gray-400 dark:text-gray-500"}`} />
                          <span className={`font-medium ${isActive ? "text-white" : "text-gray-700 dark:text-gray-200"}`}>{room.name}</span>
                        </div>
                        {/* Mock pending messages count for demo */}
                        {!isActive && Math.random() > 0.7 && (
                          <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {Math.floor(Math.random() * 10) + 1}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Users className="h-4 w-4" />
          <span className="text-sm font-medium">{activeMembers} online</span>
        </div>
        {/* Back to Home Link (Optional, kept from original) */}
        <Link className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 mt-2 text-xs" href={"/"}>
          ← Back to Home
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarContainer;

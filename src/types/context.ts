import React from "react";
import { IRoom } from "./models";

export interface ICurrentRoomContext {
    currentRoom: IRoom | null;
    setCurrentRoom: React.Dispatch<React.SetStateAction<IRoom | null>>
}
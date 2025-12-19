import { iRoom } from "@/types";
import {Schema, model} from "mongoose";

const RoomSchema : Schema<iRoom> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
        },
        slug: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
        },
        isActive: {
            type: Boolean,
            required: true
        },
        rules: {
            type: [String]
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Schema.Types.Date,
            required: true,
            default: Date.now()
        },
        memberCount: {
            type: Number,
            required: true,
            default: 1
        }

    }
)

const Room = model<iRoom>("Room", RoomSchema);

export default Room

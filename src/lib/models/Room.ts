import { IRoom } from "@/types";
import mongoose, { Schema, model } from "mongoose";

const RoomSchema: Schema<IRoom> = new Schema(
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
            type: [String],
            default: []
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Schema.Types.Date,
            required: true,
            default: Date.now
        },
        memberCount: {
            type: Number,
            required: true,
            default: 1
        },
        members: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                }
            ],
            default: []
        }

    }
)

const Room: mongoose.Model<IRoom> = (mongoose.models.Room as mongoose.Model<IRoom>) || model<IRoom>("Room", RoomSchema);

export default Room

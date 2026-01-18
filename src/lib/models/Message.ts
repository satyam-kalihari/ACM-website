import mongoose from "mongoose";
import { IMessage } from "@/types";
const { Schema, model, models } = mongoose;

const messageSchema = new Schema<IMessage>({
    content: {
        type: String,
        required: true,
    },
    attachments: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    readBy: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
})

const Message = models.Message || model<IMessage>("Message", messageSchema);

export default Message;
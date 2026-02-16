import mongoose from "mongoose";
import { IMessage } from "@/types";

const MessageSchema = new mongoose.Schema<IMessage>({
    content: {
        type: String,
        required: true,
    },
    attachments: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    readBy: {
        type: [mongoose.Schema.Types.ObjectId]
    }
})

const Message: mongoose.Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
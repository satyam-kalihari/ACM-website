import mongoose from "mongoose";
import Message from "@/lib/models/Message";
import { NextResponse } from "next/server";
import connectToDB from "@/lib/db/connectToDB";

export async function POST(req: Request) {

    try {
        await connectToDB();
    } catch (error) {
        return NextResponse.json({success: false, error: "Failed to connect to database" }, { status: 500 });
    }

    if (!req.body) {
        return NextResponse.json({success: false, error: "No data provided" }, { status: 400 });
    }

    const { content, attachments, roomId, senderId } = await req.json();

    if (!content || !roomId || !senderId) {
        return NextResponse.json({success: false, error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = new Message({
        content,
        attachments: attachments || [],
        room: new mongoose.Types.ObjectId(roomId),
        sender: new mongoose.Types.ObjectId(senderId),
    });

    try {
        await newMessage.save();
    } catch (error) {
        return NextResponse.json({success: false, error: "Failed to send message" }, { status: 500 });
    }

    

    return NextResponse.json({success: true, message: "Message sent successfully" });
}
import connectToDB from "@/lib/db/connectToDB";
import Message from "@/lib/models/Message";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    const {userId, roomId} = await req.json();

    if (!roomId || !userId) {
        return NextResponse.json({ success: false, error: "Missing required fields", code: 1}, { status: 400 });
    }

    try {
        await connectToDB();
    } catch {
        return NextResponse.json({success: false, error: "Internal Server Error", code: 2}, {status: 500})
    }

    try{
        const content = await Message.find({room: roomId}).sort({createdAt: -1}).limit(10);
        return NextResponse.json({
            success: true,
            content: content
        })
    } catch (e) {
        return NextResponse.json({success: false, error: "Internal Server Error", code: 3}, {status: 500})
    }



}
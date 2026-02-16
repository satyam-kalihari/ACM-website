import connectToDB from "@/lib/db/connectToDB";
import Message from "@/lib/models/Message";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {

    let payload;
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({msg: "Invalid Payload"}, {status: 500})
    }

    try {
        await connectToDB();
    } catch {
        return NextResponse.json({msg: "internal server error"}, {status: 500})
    }

    try {

        const message = await Message.create({
            content: payload.msg,
            attachments: payload.attachments,
            room: payload.roomId,
            author: payload.author,
            senderName: payload.senderName
        })

        return NextResponse.json({success: true, data: message});
    } catch (error){
        console.log(error)
        return NextResponse.json({msg:"payload is invalid"});
    }


}
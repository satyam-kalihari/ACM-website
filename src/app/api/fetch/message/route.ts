import connectToDB from "@/lib/db/connectToDB";
import Message from "@/lib/models/Message";
import User from "@/lib/models/User";
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

        const user = User.findOne({clerkId: payload?.clerkId});
        if (!user) return NextResponse.json({msg:"payload is invalid"});

        const messages = await Message.find({room: payload?.roomId}).sort({createdAt: -1}).limit(30).lean();
        return NextResponse.json({success: true, data: messages.reverse()});

    } catch (error){
        console.log(error)
        return NextResponse.json({msg:"payload is invalid"});
    }


}
import '@/lib/models/User';
import '@/lib/models/Room';
import connectToDB from "@/lib/db/connectToDB";
import User from "@/lib/models/User";
import Room from "@/lib/models/Room";
import { NextResponse } from "next/server";



export async function POST(req: Request) {

    let payload;

    try {
        payload = await req.json()
    } catch {
        return NextResponse.json({ success: false, msg: "Invalid Payload" }, { status: 400 })
    }

    try {
        await connectToDB();
    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Eroor" }, { status: 500 });
    }

    try {
        const user = await User.findOne({clerkId: payload.clerkId}).populate('joinedRooms').lean();
        return NextResponse.json({ success: true, msg: "Succesfully Fetched User Rooms", rooms: user?.joinedRooms || [] })
    } catch (e) {
        console.log(e)
        console.log((e as Error).message);
        return NextResponse.json({ success: false, msg: "Bad Request" }, { status: 400 })
    }

}
import '@/lib/models/User';
import '@/lib/models/Room';
import connectToDB from "@/lib/db/connectToDB";
import User from "@/lib/models/User";
import Room from "@/lib/models/Room";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';



export async function GET(req: Request) {

    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ success: false, msg: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectToDB();
    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Eroor" }, { status: 500 });
    }

    try {
        const user = await User.findOne({clerkId: userId}).populate('joinedRooms').lean();
        return NextResponse.json({ success: true, msg: "Succesfully Fetched User Rooms", rooms: user?.joinedRooms || [] })
    } catch (e) {
        console.log(e)
        console.log((e as Error).message);
        return NextResponse.json({ success: false, msg: "Bad Request" }, { status: 400 })
    }

}
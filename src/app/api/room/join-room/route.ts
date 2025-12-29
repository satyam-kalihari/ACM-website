import connectToDB from "@/lib/db/connectToDB";
import Room from "@/lib/models/Room";
import User from "@/lib/models/User";
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
        const user = await User.findByIdAndUpdate(payload.userId, { $push: { joinedRooms: payload.id } }, { new: true }).lean();

        if (!user) {
            return NextResponse.json({ success: false, msg: "User Not Found" }, { status: 404 })
        }

        const room = await Room.findByIdAndUpdate(payload.id, { $push: { members: payload.userId } }, { new: true }).lean();
        return NextResponse.json({ success: true, msg: "Succesfully Joined", data: room })
    } catch (e) {
        console.log((e as Error).message);
        return NextResponse.json({ success: false, msg: "Bad Request" }, { status: 400 })
    }

}
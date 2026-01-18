import Room from "@/lib/models/Room";
import connectToDB from "@/lib/db/connectToDB";
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
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }

    try {
        const room = await Room.findByIdAndDelete(payload.id).lean();

        if (!room) {
            return NextResponse.json({ success: false, msg: "Room not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, msg: "Successfully Deleted", data: room })
    } catch (e) {
        console.log((e as Error).message);
        return NextResponse.json({ success: false, msg: "Bad Request" }, { status: 400 })
    }
}


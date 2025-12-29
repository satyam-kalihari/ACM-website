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
        return NextResponse.json({ success: false, msg: "Internal Server Eroor" }, { status: 500 });
    }

    try {
        const room = await Room.findByIdAndUpdate(payload.id, {
            $set: {
                name: payload.name,
                slug: payload.slug,
                category: payload.category,
                icon: payload.icon,
                isActive: payload.isActive,
                createdBy: payload.createdBy
            }
        }, { new: true }).lean();
        console.log(room)

        return NextResponse.json({ success: true, msg: "Succesfully Updated", data: room })
    } catch (e) {
        console.log((e as Error).message);
        return NextResponse.json({ success: false, msg: "Bad Request" }, { status: 400 })
    }

}


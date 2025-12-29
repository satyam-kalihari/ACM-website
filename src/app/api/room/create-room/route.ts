import connectToDB from "@/lib/db/connectToDB";
import Room from "@/lib/models/Room";
import { NextResponse } from "next/server";
import { RoomSchema } from "@/lib/validators/RoomSchema";
import { z } from "zod";
import User from "@/lib/models/User";

export async function POST(req: Request) {

    let payload;

    try {
        payload = await req.json();
    } catch (e) {
        return NextResponse.json({ success: false, msg: "Invalid payload" }, { status: 400 });
    }

    const data = {
        name: payload?.name,
        description: payload?.description,
        slug: payload?.slug,
        category: payload?.category,
        icon: payload?.icon,
        isActive: payload?.isActive,
        rules: payload?.rules,
        createdBy: payload?.createdBy,
        memberCount: payload?.members?.length,
        members: [...payload?.members, payload?.createdBy]
    }

    const createRoomSchema = RoomSchema.safeParse(data);


    if (!createRoomSchema.success) {
        return NextResponse.json({ success: false, msg: z.treeifyError(createRoomSchema.error) }, { status: 400 });
    }

    try {
        await connectToDB();
    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Eroor" }, { status: 500 });
    }

    try {
        const room = await Room.create(data);
        const updateUser = await User.findByIdAndUpdate(payload?.createdBy, {$push: {joinedRooms: room._id}}, {new: true}).lean()
        return NextResponse.json({ success: true, msg: "Room Created", data: room }, { status: 200 });
    } catch (e) {
        console.log((e as Error).message);
        return NextResponse.json({ success: false, msg: "Bad Request" }, { status: 400 })
    }

}
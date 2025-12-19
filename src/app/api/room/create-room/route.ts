import connectToDB from "@/lib/db/connecToDB";
import Room from "@/lib/models/Room";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const newRoom = await req.json()

        if (!newRoom) return NextResponse.json({ status: 400, error: "Invalid payload" })

        try {
            await connectToDB();
        } catch (error) {
            console.log(error);
        }

        try {
            let room = await Room.create(newRoom);
            return NextResponse.json(room)
        } catch (error) {
            console.log(error);
            return NextResponse.json({ status: 400, error: "Form details are invalid" });
        }

    } catch {
        return NextResponse.json({ status: 400, error: "Room details are invalid" })
    }

}
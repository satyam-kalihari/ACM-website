import connectToDB from "@/lib/db/connectToDB";
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
        const user = await User.create(payload);
        return NextResponse.json({ success: true, msg: "Succesfully Created User", data: user })
    } catch (e) {
        console.log((e as Error).message);
        return NextResponse.json({ success: false, msg: "Bad Request" }, { status: 400 })
    }

}
import '@/lib/models/User';
import connectToDB from "@/lib/db/connectToDB";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';



export async function GET(req: Request) {

    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectToDB();
    } catch (e) {
        return NextResponse.json({ success: false, msg: "Internal Server Eroor" }, { status: 500 });
    }

    try {
        const user = await User.findOne({clerkId: userId}).lean();
        return NextResponse.json({ success: true, msg: "Succesfully Fetched the User", user: user || null })
    } catch (e) {
        console.log(e)
        console.log((e as Error).message);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }

}
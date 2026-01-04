import mongoose from "mongoose";
import Message from "@/lib/models/Message";
import { NextResponse } from "next/server";

export default async function POST(req: Request) {

    return NextResponse.json({ message: "Message sent successfully" });
}
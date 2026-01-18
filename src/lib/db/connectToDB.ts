import mongoose from "mongoose";
import { MongooseCache } from "@/types";

const uri = process.env.MONGODB_URI!

if (!uri) throw new Error("Please insert your MongoDB URI in the env");



let cached: MongooseCache = (global as any).mongoose as MongooseCache

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

export default async function connectToDB() {

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
        console.log("Successfully connected to the database!")
    } catch (err) {
        throw new Error("Unable to connect to the Database")
    }

    return cached.conn
}


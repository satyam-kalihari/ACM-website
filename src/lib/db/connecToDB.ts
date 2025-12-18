import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!

if (!uri) throw new Error("Please insert your MongoDB URI in the env");

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}


let cached : MongooseCache = (global as any).mongoose as MongooseCache

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null} 
}

export default async function connectToDB() {

    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        console.log(err)
    }

    return cached.conn
} 


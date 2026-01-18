import Room from "../models/Room";
import User from "../models/User";
import connectToDB from "./connectToDB";
import {Types} from "mongoose";

interface CreateUserParams {
    fullname: string;
    clerkId: string;
    email: string;
    avatar: string;
    role?: "admin" | "user" | "member";
    techStack?: string[];
    leetcodeUsername?: string;
    githubUrl?: string;
}

// const defaultRoomss = await Room.find({ slug: {
//     $in: ["acm-chat-room", "projects", "internships", "hackathons", "code-lang"]
// }})

const defaultRoomsIds = [
    "6951ae33c7e13cb104e1c936",
    "695226b652182c18fb86cc6c",
    "69527e5a3075ec0558d4d4cd",
    "69527e803075ec0558d4d4d0",
    "69527ea33075ec0558d4d4d3",
    "69527ec93075ec0558d4d4d6"]

const defaultRooms: Types.ObjectId[] = defaultRoomsIds.map(id => new Types.ObjectId(id));

export const createUser = async ({ fullname, clerkId, email, avatar, role, techStack, leetcodeUsername, githubUrl }: CreateUserParams) => {




    try {
        await connectToDB();
    } catch (e) {
        console.log("DB connection error:", (e as Error).message);
        throw new Error("Database connection error");
    }

    try{

        const dbUser = await User.create({
            fullname,
            clerkId,
            email,
            avatar,
            role,
            techStack,
            joinedRooms: defaultRooms
        })
        return {success: true, dbUser};
    } catch(e){
        console.log("User creation error:", (e as Error).message);
        throw new Error("User creation error");
    }

}
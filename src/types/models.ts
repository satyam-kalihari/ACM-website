import { Types, Document } from "mongoose";


export interface iUser extends Document {
    id: Types.ObjectId;
    username: string;
    email: string;
    clerkId: string;
    avatar: string;
    bio: string;
    role: "admin" | "user" | "member";
    techStack: string[];
    leetcodeUsername: string;
    githubUrl: string;
    joinedRooms: Types.ObjectId[];
    createdAt: Date;

}


export interface iRoom extends Document {
    id: Types.ObjectId;
    name: string;
    description: string;
    slug: string;
    category: string;
    icon: string;
    isActive: boolean;
    rules: string[];
    createdBy: Types.ObjectId;
    createdAt: Date;
    memberCount: number;
}

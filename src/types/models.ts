import { Types, Document } from "mongoose";


export interface IUser extends Document {
    _id: Types.ObjectId;
    fullname: string;
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


export interface IRoom extends Document {
    _id: Types.ObjectId;
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
    members: Types.ObjectId[]
}

export interface IProject extends Document{
    _id: Types.ObjectId;
    title: string;
    description: string;
    room: Types.ObjectId;
    liveUrl: string;
    repoUrl: string;
    techStack: string[];
    images: string[];
    viewCount: number;
    createdAt: Date;
    author: Types.ObjectId;
    upVotes: [Types.ObjectId];
}

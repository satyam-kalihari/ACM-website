import { IUser } from '@/types'
import { Schema, model } from 'mongoose'

const UserSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        clerkId: {
            type: String,
            required: true,
            unique: true
        },
        avatar: {
            type: String,
        },
        bio: {
            type: String,
        },
        role: {
            type: String,
            required: true
        },
        techStack: {
            type: [String],
            default: []
        },
        leetcodeUsername: {
            type: String,
            unique: true
        },
        githubUrl: {
            type: String,
            required: true,
            unique: true
        },
        joinedRooms: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: "Room"
            }],
            default: []
        },
        createdAt: {
            type: Schema.Types.Date,
            default: Date.now
        }
    }
)

const User = model<IUser>("User", UserSchema);

export default User
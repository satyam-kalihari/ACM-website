import { IUser } from '@/types'
import mongoose, { Schema, model } from 'mongoose'

const UserSchema: Schema<IUser> = new Schema(
    {
        fullname: {
            type: String,
            required: true
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
            unique: true,
            sparse: true
        },
        githubUrl: {
            type: String,
            unique: true,
            sparse: true
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

const User: mongoose.Model<IUser> = mongoose.models.User as mongoose.Model<IUser> || model<IUser>("User", UserSchema);

export default User
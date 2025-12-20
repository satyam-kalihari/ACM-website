import { IProject } from "@/types";
import { model, Schema } from "mongoose";

const ProjectSchema: Schema<IProject> = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        room: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Room"
        },
        liveUrl: {
            type: String
        },
        repoUrl: {
            type: String,
            required: true
        },
        techStack: {
            type: [String],
            default: []
        },
        images: {
            type: [String],
            default: []
        },
        viewCount: {
            type: Number,
            required: true,
            default: 0
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        upVotes: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: "User"
            }],
            default: []
        }
    }
)

const Project = model<IProject>("Project", ProjectSchema);

export default Project;
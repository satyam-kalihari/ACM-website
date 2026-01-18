import { z } from "zod";

export const RoomSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
    description: z.string().optional(),
    slug: z.string().min(3, "Slug must be at least 3 characters long").max(50, "Slug must be at most 50 characters long"),
    category: z.string().min(3, "Category must be at least 3 characters long").max(50, "Category must be at most 50 characters long"),
    icon: z.string().min(3, "Icon must be at least 3 characters long").max(50, "Icon must be at most 50 characters long").optional(),
    isActive: z.boolean(),
    rules: z.array(z.string()).optional(),
    createdBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID"),
})

export const UpdateRoomSchema = RoomSchema.partial()


export type RoomSchemaType = z.infer<typeof RoomSchema>
export type UpdateRoomSchemaType = z.infer<typeof UpdateRoomSchema>


import {z} from 'zod'

export const CreateCommentSchema = z.object({
	content: z.string().min(1, 'Comment cannot be empty').max(200, 'Comment cannot be more than 200 characters').trim(),
})

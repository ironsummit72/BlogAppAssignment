import commentModel from '../models/comments.model.js'
import blogModel from '../models/blogpost.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import usermodel from '../models/user.models.js'
import {CreateCommentSchema} from '../validation/CommentValidation.js'

export async function getCommentsByPost(req, res) {
	const postId = req.params.postId
	if (postId) {
		const commentData = await blogModel.findById(postId).populate('comments')
		if (commentData) {
			res.status(200).json(new ApiResponse('success', 200, commentData?.comments, 'Comments fetched successfully'))
		}
	} else {
		res.status(404).json(new ApiResponse('not found', 404, null, 'Post not found'))
	}
}
export async function createComment(req, res) {
	const postId = req.params.postId
	const {content} = req.body
	const loggedInUser=req?.user.id
	const zodresult = CreateCommentSchema.safeParse({
		content,
	})
	if (!zodresult.success) {
		res.status(400).json(new ApiResponse('bad request', 400, null, zodresult.error.issues[0].message))
	} else {
		if (postId&&loggedInUser) {
			const userData = await usermodel.findById(loggedInUser);
			if (userData) {
				const commentData = await commentModel.create({
					content: zodresult.data.content,
					user: userData._id,
					fullname: `${userData.firstname} ${userData.lastname}`,
					post: postId,
				})
				const postData = await blogModel.findById(postId)
				postData?.comments?.push(commentData._id)
				if (commentData) {
					const postData = await blogModel.findById(postId)
					postData?.comments?.push(commentData._id)
					await postData?.save()
					res.status(201).json(new ApiResponse('success', 201, commentData._id, 'Comment created successfully'))
				}
			}
		}
	}
}
export async function deleteComment(req, res) {
	const commentId = req.params.commentId
	if (commentId) {
		const commentData = await commentModel.findByIdAndDelete(commentId)
		if (commentData) {
			res.status(200).json(new ApiResponse('success', 200, null, 'Comment deleted successfully'))
		}
	}
}

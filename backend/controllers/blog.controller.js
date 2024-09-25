import blogModel from '../models/blogpost.models.js'
import usermodel from '../models/user.models.js'
import CreateBlogFormSchema from '../validation/BlogValidation.js'
import ApiResponse from '../utils/ApiResponse.util.js'
export async function createBlog(req, res) {
	const {title, content} = req.body
	const zodresult = CreateBlogFormSchema.safeParse({
		title,
		content,
	})
	if (!zodresult.success) {
		res.status(400).json(new ApiResponse('bad request', 400, null, zodresult.error.issues[0].message))
	} else {
		const blogData = await blogModel.create({
			title: zodresult.data.title,
			content: zodresult.data.content,
			owner: req?.user.id,
		})
		const userData = await usermodel.findOne({username: req?.user.username})
		userData?.blogs?.push(blogData._id)
		await userData?.save()
		if (blogData) {
			res.status(201).json(new ApiResponse('success', 201, blogData._id, 'Blog created successfully'))
		}
	}
}
export async function getBlogsOfCurrentuser(req, res) {
	const currentUser = req?.user.id
	if (currentUser) {
		const userData = await usermodel.findById(currentUser).populate('blogs')

		if (userData) {
			res.status(200).json(new ApiResponse('success', 200, userData?.blogs, 'User blogs fetched successfully'))
		}
	}
}
export async function getAllBlogs(req, res) {
	const blogData = await blogModel.find()
	if (blogData) {
		res.status(200).json(new ApiResponse('success', 200, blogData, 'All blogs fetched successfully'))
	}
}
export async function getBlogsById(req, res) {
	const blogId = req.params.id
	if (blogId) {
		const blogData = await blogModel.findById(blogId)
		if (blogData) {
			res.status(200).json(new ApiResponse('success', 200, blogData, 'Blog fetched successfully'))
		}
	}
}
export async function getOwnerById(req, res) {
	const ownerId = req.params.id
	console.log("Owner Id", ownerId);
	if (ownerId) {
		const userData = await usermodel.findById(ownerId)
		if (userData) {
			res.status(200).json(new ApiResponse('success', 200, userData, 'User fetched successfully'))
		}
	}
}
export async function deleteBlog(req, res) {
	const blogId = req.params.id
	if (blogId) {
		const blogData = await blogModel.findByIdAndDelete(blogId)
		if (blogData) {
			res.status(200).json(new ApiResponse('success', 200, null, 'Blog deleted successfully'))
		}
	}
}
export async function updateBlog(req, res) {
	const blogId = req.params.id
	const {title, content} = req.body
	const zodresult = CreateBlogFormSchema.safeParse({
		title,
		content,
	})
	if (!zodresult.success) {
		res.status(400).json(new ApiResponse('bad request', 400, null, zodresult.error.issues[0].message))
	}else{
		const blogData = await blogModel.findByIdAndUpdate(blogId, {
			title: zodresult.data.title,
			content: zodresult.data.content,
		})
		if (blogData) {
			res.status(200).json(new ApiResponse('success', 200, blogData, 'Blog updated successfully'))
		}
	}
}
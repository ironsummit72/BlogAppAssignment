
import {Router} from 'express'
import { createBlog,getAllBlogs,getBlogsOfCurrentuser,getBlogsById,getOwnerById,deleteBlog,updateBlog} from '../controllers/blog.controller.js'
const router = Router()
router.get('/user',getBlogsOfCurrentuser)
router.get('/all',getAllBlogs)
router.get('/id/:id',getBlogsById)
router.get('/ownerid/:id',getOwnerById)
router.post('/create',createBlog)
router.patch('/update/:id',updateBlog)
router.delete('/delete/:id',deleteBlog)

export default router

import { Router } from "express";
import { getCommentsByPost,createComment,deleteComment } from "../controllers/comment.controller.js";
const router = Router();

router.get('/get/:postId', getCommentsByPost);
router.post('/add/:postId', createComment);
router.delete('/delete/:commentId',deleteComment)



export default router;

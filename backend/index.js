import express from 'express'
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken'
import connectDatabase from './utils/ConnectDb.util.js'
import {configDotenv} from 'dotenv'
import cookieParser from 'cookie-parser'
import getCurrentUser from './middlewares/getCurrentuser.middleware.js'
import ApiResponse from './utils/ApiResponse.util.js'
import authRouter from './routes/auth.routes.js'
import blogRouter from './routes/blog.routes.js'
import commentRouter from './routes/comment.routes.js'
import morgan from 'morgan'
configDotenv()
const app = express()
const port = process.env.PORT

connectDatabase()
console.log('Origin Url', process.env.ORIGIN_URL)
app.use(morgan('tiny'))
app.use(
	cors({
		origin: `http://localhost:5173`,
		credentials: true,
	}),
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authRouter)
app.use(getCurrentUser)
app.use('/blog', blogRouter)
app.use('/comment', commentRouter)
app.get('/getcurrentuser', (req, res) => {
	console.log('get current user', req.user)

	const token = req.cookies.sessionId
	if (token) {
		jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			res.json(new ApiResponse('success', 200, decodedToken, 'current user', '/'))
		})
	} else {
		res.status(401).json(new ApiResponse('error', '401', null, 'unauthorize access', '/login'))
	}
})
app.listen(port, () => {
	console.log(`server is running on port ${port}`)
})

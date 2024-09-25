import usermodel from '../models/user.models.js'
import ApiResponse from '../utils/ApiResponse.util.js'
import {verifyPassword} from '../utils/HashGen.utill.js'
import {createToken} from '../utils/JsonWebToken.util.js'
import {LoginWithEmailFormSchema, LoginWithUsernameFormSchema, RegisterFormSchema} from '../validation/FormSchema.js'
export async function handleLogin(req, res) {
	const {username, email, password} = req.body
	if (username) {
		// Login with username
		const result = LoginWithUsernameFormSchema.safeParse({
			username,
			password,
		})
		if (!result.success) {
			res.status(400).json(new ApiResponse(false, 400, null, result.error.issues[0].message))
		} else {
			const dbResponse = await usermodel.findOne({username: result.data.username})
			if (dbResponse) {
				const [hash, salt] = dbResponse.password.split('.')
				const isPasswordCorrect = verifyPassword(password, hash, salt)
				if (isPasswordCorrect) {
					res.cookie(
						'sessionId',
						createToken({
							id: dbResponse._id,
							username: dbResponse.username,
							fullname: `${dbResponse.firstname} ${dbResponse.lastname}`,
						}),

						{httpOnly: true},
					)
					res.status(200).json(new ApiResponse('success', 200, dbResponse.username, 'Login successful'))
				} else {
					res.status(401).json(new ApiResponse('unauthorized', 401, null, 'Incorrect Password'))
				}
			}else{
				res.status(404).json(new ApiResponse('not found', 404, null, 'User not found please register yourself'))
			}
		}
	} else if (email) {
		//Login with email
		const zodresult = LoginWithEmailFormSchema.safeParse({
			email,
			password,
		})
		if (!zodresult.success) {
			res.status(400).json(new ApiResponse('bad request', 400, null, zodresult.error.issues[0].message))
		} else {
			const dbResponse = await usermodel.findOne({email: zodresult.data.email})
			if (dbResponse) {
				const [hash, salt] = dbResponse.password.split('.')
				const isPasswordCorrect = verifyPassword(zodresult.data.password, hash, salt)
				if (isPasswordCorrect) {
					res.cookie(
						'sessionId',
						createToken({
							id: dbResponse._id,
							username: dbResponse.username,
							fullname: `${dbResponse.firstname} ${dbResponse.lastname}`,
						}),
						{httpOnly: true},
					)
					res.status(200).json(new ApiResponse('success', 200, dbResponse.username, 'Login successful'))
				} else {
					res.status(401).json(new ApiResponse('unauthorized', 401, null, 'Incorrect Password'))
				}
			} else {
				res.status(404).json(new ApiResponse('false', 404, null, 'User not found with this email address '))
			}
		}
	} else {
		res.status(400).json(new ApiResponse('not found', 404, null, 'Please email or username'))
	}
}
export async function handleRegister(req, res) {
	const {username, email, firstname, lastname, password, confirmpassword} = req.body
	const zodresult = RegisterFormSchema.safeParse({
		username,
		email,
		firstname,
		lastname,
		password,
		confirmpassword,
	})

	if (!zodresult.success) {
		res.status(400).json(new ApiResponse('bad request', 400, null, zodresult.error.issues[0].message))
	} else {
		try {
			const RegisterUserData = await usermodel.create({
				username: zodresult.data.username,
				email: zodresult.data.email,
				firstname: zodresult.data.firstname,
				lastname: zodresult.data.lastname,
				password: zodresult.data.password,
			})
			if (RegisterUserData) {
				res.status(201).json(new ApiResponse('success', 201, RegisterUserData.username, 'Registration successful'))
			}
		} catch (error) {
			res.status(400).json(new ApiResponse('bad request', 400, null, 'User already Exists Please Login '))
		}
	}
}
export async function handleLogout(req, res) {
	res.clearCookie('sessionId')
	res.status(201).json(new ApiResponse('success', 201, null, 'Logout successful'))
}

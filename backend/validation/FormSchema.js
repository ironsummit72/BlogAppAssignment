import {z} from 'zod'

const LoginWithUsernameFormSchema = z.object({
	username: z
		.string()
		.min(3, 'Username too short')
		.max(20, 'Username cannot be more than 20 characters')
		.trim()
		.toLowerCase(),
	password: z.string().min(3, 'Password too short').max(50, 'Password too long').trim(),
})
const LoginWithEmailFormSchema = z.object({
	email: z.string().email('Invalid email address').min(3, 'Username too short').trim(),
	password: z.string().min(3, 'Password too short').max(50, 'Password too long').trim(),
})
const RegisterFormSchema = z
	.object({
		username: z.string().min(3, 'Username too short').max(20, 'Username cannot be more than 20 characters').trim(),
		email: z.string().email('Invalid email address').min(3, 'Username too short').trim(),
		firstname: z.string().min(3, 'firstname too short').max(20, 'firstname cannot be more than 30 characters').trim(),
		lastname: z.string().min(1, 'firstname too short').max(20, 'firstname cannot be more than 30 characters').trim(),
		password: z.string().min(3, 'Password too short').max(50, 'Password too long').trim(),
		confirmpassword: z.string().min(3, 'Password too short').max(50, 'Password too long').trim(),
	})
	.refine((values) => values.password === values.confirmpassword, {
		message: 'Password does not match',
		path: ['confirmpassword'],
	})

export {LoginWithUsernameFormSchema, LoginWithEmailFormSchema, RegisterFormSchema}

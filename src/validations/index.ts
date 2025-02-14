import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
		name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
		password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
		password_confirmation: z.string(),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Password doesn't match",
		path: ['password_confirmation'],
	});

export const tokenSchema = z.string({ message: 'Invalid token' }).length(6, { message: 'Invalid token' });

export const LoginSchema = z.object({
	email: z.string().min(1, { message: 'Type a valid email' }).email({ message: 'Invalid email' }),
	password: z.string().min(8, { message: 'Type a valid password' }),
});

export const SuccessSchema = z.string();
export const ErrorResponseSchema = z.object({
	message: z.string(),
});
export const UserSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;

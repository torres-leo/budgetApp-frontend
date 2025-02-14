'use server';
import { cookies } from 'next/headers';
import { ErrorResponseSchema, LoginSchema } from '@/validations';
import { redirect } from 'next/navigation';
import { privateLinks } from '@/data/privateLinks';

type FormErrors = {
	email?: string[];
	password?: string[];
	message?: string;
};

type ActionStateType = {
	errors: FormErrors;
};

export async function authenticateUser(prevState: ActionStateType, formData: FormData) {
	const credentials = {
		email: formData.get('email'),
		password: formData.get('password'),
	};

	const result = LoginSchema.safeParse(credentials);

	if (!result.success) {
		return {
			errors: { ...result.error.flatten().fieldErrors, message: '' },
		};
	}

	const url = `${process.env.API_URL}/auth/login`;
	const req = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: result.data.email,
			password: result.data.password,
		}),
	});

	const json = await req.json();

	// Check for different types of errors (401, 403, 404)
	if (!req.ok) {
		const error = ErrorResponseSchema.parse(json);

		return {
			errors: { message: error.message },
		};
	}

	const cookiesStore = cookies();
	cookiesStore.set({
		name: 'BudgeAppToken',
		value: json,
		httpOnly: true,
		path: '/',
	});

	redirect(privateLinks.admin);
}

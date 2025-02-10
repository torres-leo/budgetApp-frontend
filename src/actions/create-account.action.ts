'use server';

import { ErrorResponseSchema, registerSchema, SuccessSchema } from '@/validations';

type FormErrors = {
	name?: string[];
	email?: string[];
	password?: string[];
	password_confirmation?: string[];
	general?: string;
};

type ActionStateType = {
	errors: FormErrors;
	success: string;
	values: { email: string };
};

export async function registerUser(prevState: ActionStateType, formData: FormData) {
	const registerData = {
		email: formData.get('email') as string,
		name: formData.get('name') as string,
		password: formData.get('password') as string,
		password_confirmation: formData.get('password_confirmation') as string,
	};

	const result = registerSchema.safeParse(registerData);

	if (!result.success) {
		return {
			errors: { ...result.error.flatten().fieldErrors, general: '' },
			success: prevState.success,
			values: { email: '' },
		};
	}

	const url = `${process.env.API_URL}/auth/create-account`;

	const req = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: result.data.name,
			email: result.data.email,
			password: result.data.password,
		}),
	});

	const json = await req.json();
	if (req.status === 409) {
		const error = ErrorResponseSchema.parse(json);

		return {
			success: prevState.success,
			errors: { ...prevState.errors, email: [error.message], general: error.message },
			values: { email: '' },
		};
	}

	const success = SuccessSchema.parse(json);

	return {
		errors: prevState.errors,
		values: { email: result.data.email },
		success,
	};
}

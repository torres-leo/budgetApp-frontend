'use server';

import { ErrorResponseSchema, ForgotPasswordSchema, SuccessSchema } from '@/validations';

type ActionStateType = {
	errors: string[];
	success: string;
};

export async function forgotPassword(prevState: ActionStateType, formData: FormData) {
	const result = ForgotPasswordSchema.safeParse({
		email: formData.get('email'),
	});

	if (!result.success) {
		return {
			errors: result.error.errors.map((e) => e.message),
			success: '',
		};
	}

	const url = `${process.env.API_URL}/auth/forgot-password`;
	const req = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email: result.data.email }),
	});

	const json = await req.json();

	if (!req.ok) {
		const error = ErrorResponseSchema.parse(json);
		return {
			errors: [error.message],
			success: '',
		};
	}

	const success = SuccessSchema.parse(json);

	return {
		errors: [],
		success,
	};
}

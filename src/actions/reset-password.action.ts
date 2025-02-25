'use server';

import { ErrorResponseSchema, ResetPasswordSchema, SuccessSchema } from '@/validations';

type ActionStateType = {
	errors: string[];
	success: string;
};

export async function resetPassword(token: string, prevState: ActionStateType, formData: FormData) {
	const resetPasswordInput = {
		password: formData.get('password'),
		password_confirmation: formData.get('password_confirmation'),
	};

	const result = ResetPasswordSchema.safeParse(resetPasswordInput);

	if (!result.success) {
		return { errors: result.error.errors.map((e) => e.message), success: '' };
	}

	const url = `${process.env.API_URL}/auth/reset-password/${token}`;

	const req = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			password: result.data.password,
		}),
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

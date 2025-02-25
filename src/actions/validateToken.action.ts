'use server';

import { ErrorResponseSchema, SuccessSchema, tokenSchema } from '@/validations';

type ActionStateType = {
	errors: string[];
	success: string;
};

export async function validateToken(token: string, prev: ActionStateType) {
	const result = tokenSchema.safeParse(token);

	if (!result.success) {
		return {
			errors: result.error.errors.map((e) => e.message),
			success: '',
		};
	}

	const url = `${process.env.API_URL}/auth/validate-token`;

	const req = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			token: result.data,
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

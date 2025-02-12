'use server';

import { ErrorResponseSchema, SuccessSchema, tokenSchema } from '@/validations';

type ActionState = {
	errors: string[];
	success: string;
};

export async function confirmAccount(token: string, prevState: ActionState) {
	const confirmToken = tokenSchema.safeParse(token);

	if (!confirmToken.success) {
		return {
			errors: confirmToken.error.issues.map((e) => e.message),
			success: prevState.success,
		};
	}

	const url = `${process.env.API_URL}/auth/confirm-account`;
	const req = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			token: confirmToken.data,
		}),
	});

	const json = await req.json();

	if (!req.ok) {
		const error = ErrorResponseSchema.parse(json);

		return {
			errors: [error.message],
			success: prevState.success,
		};
	}

	const success = SuccessSchema.parse(json);

	return {
		errors: [],
		success,
	};
}

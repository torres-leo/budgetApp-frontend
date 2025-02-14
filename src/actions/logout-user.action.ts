'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { publicLinks } from '@/data/publicLinks';
export async function logout() {
	const cookiesStore = cookies();

	cookiesStore.delete('BudgeAppToken');
	redirect(publicLinks.login);
}

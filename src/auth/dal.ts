import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';

import { publicLinks } from '@/data/publicLinks';
import { UserSchema } from '@/validations';
import { getUserToken } from './user-token';

export const verifySession = cache(async () => {
  const token = getUserToken()

  if (!token) {
    redirect(publicLinks.login);
  }

  const url = `${process.env.API_URL}/auth/user`;
  const req = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const session = await req.json();

  const result = UserSchema.safeParse(session);

  if (!result.success) {
    redirect(publicLinks.login);
  }

  return {
    user: result.data,
    isAuth: true,
  };
});

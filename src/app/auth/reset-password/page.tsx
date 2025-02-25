import PasswordResetHandler from '@/components/auth/PasswordResetHandler';
import React from 'react';

function ResetPasswordPage() {
	return (
		<>
			<h1 className='font-bold text-5xl text-purple-950 mb-8'>Reset your passwword</h1>

			<PasswordResetHandler />
		</>
	);
}

export default ResetPasswordPage;

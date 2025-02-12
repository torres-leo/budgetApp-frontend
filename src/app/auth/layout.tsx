import { ReactNode } from 'react';
import Logo from '@/components/ui/Logo';
import ToastNotify from '@/components/ui/ToastNotify';

interface Props {
	children: ReactNode;
}

function AuthLayout({ children }: Props) {
	return (
		<>
			<div className='auth-layout-container'>
				<div className='auth-layout-design'>
					<Logo />
				</div>

				<div className='p-5 pt-10 max-w-4xl'>{children}</div>
			</div>

			<ToastNotify />
		</>
	);
}

export default AuthLayout;

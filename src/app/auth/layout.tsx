import Logo from '@/components/ui/Logo';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

function AuthLayout({ children }: Props) {
	return (
		<div className='auth-layout-container'>
			<div className='auth-layout-design'>
				<Logo />
			</div>

			<div className='p-5 pt-10 max-w-4xl'>{children}</div>
		</div>
	);
}

export default AuthLayout;

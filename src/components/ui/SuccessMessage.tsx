import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
}

function SuccessMessage({ children, className }: Props) {
	return (
		<p className={`text-center px-2 py-3 block bg-green-600 text-white font-bold rounded-md ${className ?? ''}`}>
			{children}
		</p>
	);
}

export default SuccessMessage;

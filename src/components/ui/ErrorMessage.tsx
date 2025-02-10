interface Props {
	message: string;
	className?: string;
}

function ErrorMessage({ message, className }: Props) {
	return <span className={`text-red-500 block text-sm ${className ?? ''}`}>{message}</span>;
}

export default ErrorMessage;

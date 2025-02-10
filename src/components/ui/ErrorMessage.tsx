interface Props {
	message: string;
}

function ErrorMessage({ message }: Props) {
	return <span className='text-red-500 block text-sm'>{message}</span>;
}

export default ErrorMessage;

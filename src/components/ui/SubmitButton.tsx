'use client';

interface Props {
	value: string;
	className?: string;
	disabled?: boolean;
}

function SubmitButton({ value, className, disabled }: Props) {
	return (
		<button
			type='submit'
			className={`bg-purple-900 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-bold text-xl cursor-pointer block ${
				className ?? ''
			} disabled:cursor-not-allowed disabled:opacity-70`}
			disabled={disabled}>
			{value}
		</button>
	);
}

export default SubmitButton;

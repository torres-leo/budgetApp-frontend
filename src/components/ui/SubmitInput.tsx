interface Props {
	value: string;
	className?: string;
}

function SubmitInput({ value, className }: Props) {
	return (
		<input
			type='submit'
			value={value}
			className={`bg-purple-900 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-bold  text-xl cursor-pointer block ${
				className ?? ''
			}`}
		/>
	);
}

export default SubmitInput;

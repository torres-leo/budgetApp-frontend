import { SiBitcoincash } from 'react-icons/si';

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

interface Props {
	iconSize?: IconSize;
	textClasses?: string;
	separation?: string;
}

function Logo({ iconSize = '5xl', textClasses = 'text-5xl', separation = 'gap-x-2' }: Props) {
	const setIconSizeClass = (size: IconSize) => {
		switch (size) {
			case 'sm':
				return 'text-sm';
			case 'md':
				return 'text-md';
			case 'lg':
				return 'text-lg';
			case 'xl':
				return 'text-xl';
			case '2xl':
				return 'text-2xl';
			case '3xl':
				return 'text-3xl';
			case '4xl':
				return 'text-4xl';
			default:
				return 'text-5xl';
		}
	};

	return (
		<div className={`flex items-center justify-center ${separation}`}>
			<SiBitcoincash className={`text-white ${setIconSizeClass(iconSize)}`} />
			<p className={` font-bold text-white italic ${textClasses}`}>
				Budget<span className='text-yellow-500 not-italic'>App</span>
			</p>
		</div>
	);
}

export default Logo;

import { SiBitcoincash } from 'react-icons/si';

function Logo() {
	return (
		<div className='flex items-center gap-x-2 justify-center'>
			<SiBitcoincash className='text-white text-5xl' />
			<p className='text-5xl font-bold text-white italic'>
				Budget<span className='text-yellow-500 not-italic'>App</span>
			</p>
		</div>
	);
}

export default Logo;

'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { MdOutlineMenu } from 'react-icons/md';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';

import { logout } from '@/actions/logout-user.action';
import { User } from '@/validations';

interface Props {
	user: User;
}

export default function AdminMenu({ user }: Props) {
	return (
		<Popover className='relative'>
			<PopoverButton className='dropdown'>
				<MdOutlineMenu className='w-8 h-8 text-white ' />
			</PopoverButton>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-200'
				enterFrom='opacity-0 translate-y-1'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease-in duration-150'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-1'>
				<PopoverPanel className='absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48'>
					<div className='w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
						{/* <p className='text-center'>Hello {user.name}: </p> */}
						<div className='flex flex-col gap-y-1'>
							<Link href='/admin/profile/settings' className='block hover:text-purple-950'>
								Profile
							</Link>
							<Link href='/admin' className='block hover:text-purple-950 mb-1'>
								Budgets
							</Link>
							<button
								className='border-t-[1px] border-red-400 text-left block text-red-400'
								type='button'
								onClick={async () => {
									await logout();
								}}>
								Logout
							</button>
						</div>
					</div>
				</PopoverPanel>
			</Transition>
		</Popover>
	);
}

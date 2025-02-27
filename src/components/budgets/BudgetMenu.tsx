"use client"
import { Fragment } from "react"
import Link from "next/link"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Budget } from "@/types/budgets";
import { privateLinks } from "@/data/privateLinks";

export default function BudgetMenu({ budgetId }: { budgetId: Budget["id"] }) {
  return (
    <Menu as="div" className="relative flex-none">
      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">opciones</span>
        <IoEllipsisVerticalSharp className="size-8" aria-hidden="true" />

      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-10 -top-2 z-10 w-72 origin-top-right rounded-md bg-white py-2 px-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <div className="flex justify-between">
            <MenuItem>
              <Link
                href={`${privateLinks.budgets}/${budgetId}`}
                className='inline-flex items-center justify-center gap-x-2 px-3 py-1 text-sm leading-6 text-gray-900 border rounded-md hover:bg-transparent transition-colors duration-200 font-medium hover:bg-amber-100'
              >
                <FaEye />
                Watch
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={`${privateLinks.budgets}/${budgetId}/edit`}
                className='inline-flex items-center justify-center gap-x-2 px-3 py-1 text-sm leading-6 text-green-600 border  rounded-md hover:bg-transparent transition-colors duration-200 font-medium hover:bg-green-100'
              >
                <FaEdit />
                Edit
              </Link>
            </MenuItem>

            <MenuItem>
              <button
                type='button'
                className='inline-flex items-center justify-center gap-x-2 px-3 py-1 text-sm leading-6 text-red-500 border rounded-md hover:bg-transparent transition-colors duration-200 font-medium hover:bg-red-100'
                onClick={() => { }}
              >
                <MdDelete />
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
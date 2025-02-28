import Link from 'next/link'
import { privateLinks } from '@/data/privateLinks'

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-full space-y-5'>
      <h1 className="font-black text-9xl text-purple-950 animate-[bounce_2s_ease-in-out_infinite]">Error 404</h1>
      <h2 className="font-black text-6xl text-purple-950">Budget Not Found</h2>

      <Link href={privateLinks.admin} className='bg-amber-500 px-10 py-2 rounded-lg text-white font-bold cursor-pointer inline-block'>Home</Link>
    </div>
  )
}
import Link from "next/link"
import Logo from "./ui/Logo"
import AdminMenu from "./admin/AdminMenu"
import { User } from "@/validations"

interface Props {
  user: User
}

function Header({ user }: Props) {
  return (
    <header className='bg-purple-950 py-5'>
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
        <div className='w-96'>
          <Link href={'/admin'}>
            <Logo />
          </Link>
        </div>

        <AdminMenu user={user} />
      </div>
    </header>
  )
}

export default Header
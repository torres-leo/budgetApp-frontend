import React from 'react'
import Logo from './ui/Logo'

function Footer() {
  return (
    <footer className='py-5 bg-black'>
      <Logo iconSize='sm' textClasses='text-sm' separation='gap-x-1' />
      <p className='text-center text-white text-sm'>&copy; All rights reserved</p>
      <p className='text-center text-white text-xs'>{new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer
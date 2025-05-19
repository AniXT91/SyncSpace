import Logo from '@/app/_components/logo'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import React from 'react'

export default function SideNav() {
  return (
    <div className='h-screen md:w-72 hidden md:block fixed bg-blue-50'>
      <div className='flex justify-between items-center p-5'>
        <Logo containerClassName='md:h-14 w-14 rounded-4xl' imageClassName='p-0.5 scale-200 ' />
        <Bell className='h-5 w-5 text-black-100'/>
      </div>
      <hr className='my-3 '></hr>
      <div>
        <div className='flex justify-between items-center p-4'>
        <h2 className='font-bold'>Workspace Name</h2>
        <Button size='sm'>+</Button>
        </div>
      </div>
    </div>
  )
}
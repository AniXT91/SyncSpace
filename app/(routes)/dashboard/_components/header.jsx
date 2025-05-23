"use client"

import Logo from '@/app/_components/logo'
import { useAuth } from '@clerk/clerk-react';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

function header() {
  const { orgId } = useAuth();
  return (
    <div className='flex justify-between items-center pr-3 pb-3.5 pl-3 shadow sm'>
      <Logo containerClassName='mt-2 mb-6 transform scale-171 md:w-25 h-25' />
      <div className="mr-11 transform scale-115">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/dashboard"
          afterLeaveOrganizationUrl="/dashboard"
        />
      </div>
      <div className="transform scale-110">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  )
}

export default header
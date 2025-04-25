import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center">
      <div className="w-35 h-27 relative mt-1 mb-6 transform scale-171"> 
        <Image 
          src="/logo.png"
          alt="logo"
          fill
          className=" object-contain rounded-full"
        />

      </div>
    </Link>
  )
}

export default Logo

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo({ className = '' }) {
  return (
    <Link href="/dashboard">
      <div className={`relative mt-1 mb-6 transform scale-171 ${className}`}> 
        <Image 
          src="/logo.png"
          alt="logo"
          fill
          className="object-contain rounded-full"
        />
      </div>
    </Link>
  )
}

export default Logo
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Logo({ containerClassName = '', imageClassName = '' }) {
  return (
    <Link href="/dashboard">
      <div className={`relative overflow-hidden ${containerClassName}`}>
        <Image 
          src="/logo.png"
          alt="logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className={`object-contain rounded-full ${imageClassName}`}
        />
      </div>
    </Link>
  );
}

export default Logo;
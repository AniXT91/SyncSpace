"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function DocList({ documentList, workspaceId, documentId }) {
  const router = useRouter();

  return (
    <div>
      {documentList.map((doc, index) => (
        <div 
          key={index}
          onClick={() => router.push(`/workspace/${workspaceId}/${doc?.id}`)}
          className={`mt-3 p-2 px-3 hover:bg-gray-200 
          rounded-lg cursor-pointer flex justify-between items-center
          ${doc?.id === documentId && 'bg-white'}`}
        >
          <div className='flex gap-2 items-center'>
            {!doc.emoji && (
              <Image 
                src="/loopdocument.svg" 
                alt="Document" 
                width={20} 
                height={20} 
              />
            )}
            <h2 className='flex gap-2'>{doc?.emoji} {doc.documentName}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocList;
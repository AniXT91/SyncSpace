"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { AlignLeft, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function WorkspaceList() {
  const { user } = useUser();
  const [workspaceList, setWorkspaceList] = useState([]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 md:px-24 lg:px-36 xl:px-52">
      <div className="w-full max-w-5xl">
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Hello, {user?.fullName}</h2>
          <Link href="/createWorkspace">
            <Button>+</Button>
          </Link>
        </div>

        {/* Section Title */}
        <div className="mt-5 flex justify-between items-center">
          <h2 className="font-medium text-primary">Workspaces</h2>
          <div className="flex gap-2">
            <LayoutGrid />
            <AlignLeft />
          </div>
        </div>

        {/* Workspaces List or Empty State */}
        {workspaceList?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-5 h-[60vh] w-full">
            <Image
              className='ml-7 mr-5'
              src="/workspace.png"
              width={220}
              height={220}
              alt="workspace"
            />

            <h2 className="text-lg font-medium mt-4 mr-5 ml-5">
              Create a new workspace
            </h2>

            <Link href="/createWorkspace">
              <Button className="my-3 mr-3">+ New Workspace</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-5">
            <WorkspaceItemList workspaceList={workspaceList} />
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkspaceList;

"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CoverPicker from '@/app/_components/coverPicker'
import { Loader2Icon, SmilePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import EmojiPickerComponent from '@/app/_components/emojiPicker'
import { useUser } from '@clerk/nextjs'
import { useAuth } from '@clerk/clerk-react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import { useRouter } from 'next/navigation'
import uuid4 from 'uuid4'

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState('/cover.png');
  const [workspaceName, setWorkspaceName] = useState('');
  const [emoji, setEmoji] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUser();
  const { orgId } = useAuth();
  const router = useRouter();  

  const OnCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      setError("Workspace name is required");
      return;
    }

    setLoading(true);
    setError('');  // Clear previous error

    try {
      const workspace = await addDoc(collection(db, 'Workspace'), {
        workspaceName: workspaceName.trim(),
        emoji: emoji === undefined ? null : emoji,
        coverImage,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
        createdAt: serverTimestamp(),
      });

      console.log("Data Inserted with ID:", workspace.id); //Workspace Created
      
      const docId = uuid4();
      await addDoc(collection(db,'workspaceDocuments'),{
        workspaceId:workspace.id,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        coverImage:null,
        emoji:null,
        id:docId,
        documentName:'Untitled Document',
        documentContent:[]
      })

      await addDoc(collection(db,'documentOutput'),{
        docId:docId,
        output:[]
      })

      setLoading(false);
      router.replace('/workspace/'+workspace.id+"/"+docId);

      // Optionally reset form or navigate
    } catch (error) {
      setLoading(false);
      console.log(user);
      setError("Failed to create workspace. Please try again.");
      console.error("Error adding document:", error);
    }
  };

  return (
    <div className='p-10 md:px-36 lg:px-64 xl:px-96 py-28'>
      <div className='shadow-2xl rounded-xl'>
        {/* Cover Image */}
        <CoverPicker setNewCover={setCoverImage}>
          <div className='relative group'>
            <h2 className='hidden absolute font-bold p-4 w-full h-full group-hover:flex
                 items-center justify-center'> Change Cover </h2>
            <div className='group-hover:opacity-60 cursor-pointer'>
              <Image src={coverImage} alt='cover' width={400} height={400} className="w-full h-[150px] object-cover rounded-t-xl" />
            </div>
          </div>
        </CoverPicker>

        {/* Input Section */}
        <div className='p-12'>
          <h2 className='font-medium text-xl'>Create a new workspace</h2>
          <h2 className='text-sm mt-2'>This is a shared space where you can collaborate with your team. You can always rename it later.</h2>
          <div className='mt-8 flex gap-2 items-center'>
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button variant='outline'>
                {emoji ? emoji : <SmilePlus />}
              </Button>
            </EmojiPickerComponent>

            <Input
              placeholder="Workspace Name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
          </div>

          {/* Error Message */}
          {error && <p className='text-red-500 mt-2'>{error}</p>}

          <div className='mt-7 flex justify-end gap-6'>
            <Button
              disabled={!workspaceName.trim() || loading}
              onClick={OnCreateWorkspace}
            >
              Create {loading && <Loader2Icon className='animate-spin ml-2' />}
            </Button>
            <Button variant="outline" onClick={() => { router.replace('/dashboard')}}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;

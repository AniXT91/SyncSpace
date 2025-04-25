'use client'

import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

function EmojiPickerComponent({children,setEmojiIcon}) {
  
    const[open,setOpen] = useState(false);
  return (
    <div>

        <div onClick={()=>setOpen(true)}>
            {children}
        </div>
        {open && <div className='absolute mt-4 z-10'>
        <EmojiPicker 
        emojiStyle='facebook'
        onEmojiClick={(e)=>{
            setEmojiIcon(e.emoji);
            setOpen(false);
        }}/>
        </div>
        }

       

    </div>
  )
}

export default EmojiPickerComponent

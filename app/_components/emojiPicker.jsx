'use client'

import React, { useState, useEffect, useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'

function EmojiPickerComponent({ children, setEmojiIcon }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const onEmojiClick = (emojiData) => {
    setEmojiIcon(emojiData.emoji)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger */}
      <div onClick={() => setOpen(o => !o)}>
        {children}
      </div>

      {/* Picker */}
      {open && (
        <div className="absolute mt-2 z-10">
          <EmojiPicker
            emojiStyle="facebook"
            onEmojiClick={onEmojiClick}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerComponent

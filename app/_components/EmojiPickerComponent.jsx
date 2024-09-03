import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'

function EmojiPickerComponent({children, selectedEmoji}) {
    const [openPicker,setopenPicker] = useState(false);
  return (
    <div>
        <div onClick={()=>setopenPicker(true)}>
            {children}
        </div>

        {openPicker &&
            <div className='absolute z-10'>
                <EmojiPicker emojiStyle='whatsapp' onEmojiClick={(e)=>{
                    selectedEmoji(e.emoji);
                    setopenPicker(false);}}/>
            </div>
        }

    </div>
    
  )
}

export default EmojiPickerComponent
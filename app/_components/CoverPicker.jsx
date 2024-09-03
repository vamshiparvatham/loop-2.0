"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import Image from 'next/image'
import CoverOption from '../_shared/CoverOption'
import { Button } from '@/components/ui/button'
  

const CoverPicker = ({children, setNewCover}) => {
    const [coverselected,Setcoverselected] = useState();
  return (
    <Dialog>
  <DialogTrigger className='w-full'>
    {children}
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update Cover..</DialogTitle>
      <DialogDescription>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
  {CoverOption.map((cover, index) => (
    <div 
      key={index}
      onClick={() => Setcoverselected(cover?.imageUrl)} 
      className={`${coverselected === cover?.imageUrl ? 'border-purple-800 border-2' : ''} p-1 rounded-md`}
    >
      <Image 
        src={cover?.imageUrl} 
        width={200} 
        height={140} 
        className='w-full h-[70px] object-cover rounded-md' 
        alt={`Cover ${index + 1}`}
      />
    </div>
  ))}
  {console.log(coverselected)}
</div>

      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={()=>setNewCover(coverselected)}>
              Confirm
            </Button>
          </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default CoverPicker
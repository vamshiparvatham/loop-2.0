import { Link2, MoreVertical, PenIcon, Trash2 } from 'lucide-react';
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  

function DocumentOptions({doc,deleteDocument}) {
    
  return (
    <div>
        
        <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical/></DropdownMenuTrigger>
        <DropdownMenuContent>
            
            <DropdownMenuItem className ='flex gap-2'><Link2 className='h-4 w-4'/> Share link</DropdownMenuItem>
            <DropdownMenuItem className ='flex gap-2'><PenIcon className='h-4 w-4'/> Rename</DropdownMenuItem>
            <DropdownMenuItem 
            onClick={()=>deleteDocument(doc?.docId)} 
            className ='flex gap-2  text-red-500'
            ><Trash2 className='h-4 w-4'/>Delete</DropdownMenuItem>
            
        </DropdownMenuContent>
        </DropdownMenu>


    </div>
  )
}

export default DocumentOptions;
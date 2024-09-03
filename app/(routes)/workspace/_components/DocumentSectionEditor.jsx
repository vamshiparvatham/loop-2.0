import React, { useState } from 'react'
import Documentheader from './Documentheader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CommentBox from './CommentBox'

function DocumentSectionEditor({params}) {
  const [openComment,setOpenComment] = useState(false);
  return (
    < div className='relative'>

        <Documentheader params={params}/>
        <DocumentInfo params={params}/>
  
              <RichDocumentEditor params = {params}/>
    
            <div className='fixed right-10 bottom-10'>
              <Button onClick={()=>setOpenComment(!openComment)}>
                {openComment? <X/>:<MessageCircle/>}
              </Button>
              {openComment&&<CommentBox/>}
            </div>
            
        
    </div>
  )
}

export default DocumentSectionEditor
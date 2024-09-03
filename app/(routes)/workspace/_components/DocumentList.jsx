"use client"
import { File } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import DocumentOptions from './DocumentOptions';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

import { toast } from 'sonner';

function DocumentList({documentList,params}) {
  const router = useRouter();

  const deleteDocument = async(docId)=>{
    console.log(docId);
    await deleteDoc(doc(db, "DocumentId", docId));
    toast("Document deleted");
}
  
  return (
    <div>
      
        {documentList.map((doc,index)=>(
          <div key = {index} className={`mt-3 p-2 px-3 hover:bg-gray-300 cursor-pointer rounded-lg
            flex justify-between items-center 
          ${doc?.docId === params?.documentId ? 'bg-white' : ''}`} 
          onClick={()=>router.push('/workspace/'+params?.workspaceId+"/"+doc?.docId)}>
            <div className='flex items-center gap-2 '>
              {!doc?.emoji && <File/>}
              <h2 className='font-bold'> {doc?.emoji} {doc.DocumentName}</h2>
              
            </div>  
            <DocumentOptions doc={doc} deleteDocument={(docId)=>deleteDocument(docId)}/>
          </div>
        ))}
        
    </div>
    
  )
}

export default DocumentList
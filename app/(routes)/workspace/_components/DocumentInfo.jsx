"use client"
import CoverPicker from '@/app/_components/CoverPicker'
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent'
import { db } from '@/config/firebaseconfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { SmilePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


function DocumentInfo({params}) {
    const [coverpage, Setcoverpage] = useState('/coverpage.jpeg')
    const [emoji,setEmoji] = useState();
    const [documentInfo, setDocumentInfo] = useState();
    console.log(params);

    useEffect(()=>{
        params&&getDocumentInfo();
    },[params])

    const getDocumentInfo = async()=>{
        const docRef = doc(db,'DocumentId',params?.documentId);
        const docSnap = await getDoc(docRef);
        
        if(docSnap.exists()){
            console.log(docSnap.data());
            setDocumentInfo(docSnap.data());
            setEmoji(docSnap.data()?.emoji);
            docSnap.data()?.coverImage&&Setcoverpage(docSnap.data()?.coverImage);
        }
    }

    const updateDocumentInfo = async(key,value)=>{
        const docRef = doc(db,'DocumentId',params?.documentId);
        await updateDoc(docRef,{
            [key]:value
        })
        toast('Document updated!')
    }

  return (
    <div>
        {/* Coverpicker */}

        <CoverPicker className='p-2' setNewCover={(v)=>{
            Setcoverpage(v);
            updateDocumentInfo('coverImage',v)
            }}>
            <div className='relative group cursor-pointer'>
                <h2 className='hidden absolute p-2 w-full h-full group-hover:flex items-center justify-center font-bold'>Cover page</h2>
                <Image src= {coverpage} width={350} height={300} 
                    className='group-hover:opacity-45 w-full h-[200px] rounded-t-xl
                    object-cover'/>
            </div>
        </CoverPicker>

        {/* EmojiPicker */}
        <div className='absolute ml-10 mt-[-40px] cursor-pointer'>
            <EmojiPickerComponent selectedEmoji={(v)=>{
                setEmoji(v);
                updateDocumentInfo('emoji',v);
            }}>
                <div className='bg-[#fffffb0] p-4 rounded-md'>
                    {emoji? <span className='text-4xl'>{emoji}</span>:<SmilePlus className='h-10 w-10 bg-slate-200 text-gray-500'/>}
                </div>
            </EmojiPickerComponent>
        </div>
            {/* FileName */}
        <div className='ml-[40px] mt-5 p-10'>
            <input className='outline-none font-bold text-4xl' type="text" placeholder='Untitled Document'
            defaultValue={documentInfo?.DocumentName}
            onBlur={(event)=>{updateDocumentInfo('DocumentName',event.target.value)}}/>
        </div>


    </div>
  )
}

export default DocumentInfo
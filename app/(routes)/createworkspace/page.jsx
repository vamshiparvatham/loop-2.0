"use client"
import CoverPicker from '@/app/_components/CoverPicker'
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/config/firebaseconfig'
import { useAuth, useUser } from '@clerk/nextjs'
import { doc, setDoc } from 'firebase/firestore'
import { LoaderPinwheel, SmilePlus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import uuid4 from 'uuid4'

const page = () => {
    const [coverpage, Setcoverpage] = useState('/coverpage.jpeg')
    const [workspaceName, setworkspaceName] = useState();
    const [emoji,setEmoji] = useState();
    const [loading, setloading] = useState(false);
    const router = useRouter();

    const {user} = useUser();
    const {orgId} = useAuth();

    const onCoverChange = async()=>{
        setloading(true);
        const workspaceId = Date.now();
        
        const result = await setDoc(doc(db,'Workspace',workspaceId.toString()),{
            workspaceName:workspaceName,
            emoji:emoji,
            coverImage:coverpage,
            createdby:user?.primaryEmailAddress?.emailAddress,
            id:workspaceId,
            orgId:orgId?orgId:user?.primaryEmailAddress?.emailAddress,
        });
        const docId = uuid4();
        await setDoc(doc(db,'DocumentId',docId.toString()),{
            DocumentName:"Untitled", 
            workspaceId:workspaceId,
            emoji:null,
            coverImage:null,
            createdby:user?.primaryEmailAddress?.emailAddress,
            docId:docId,
            documentOutput: []
        })
        await setDoc(doc(db,'DocumentOutput',docId.toString()),{
            output:[],
            docId:docId
        })
        setloading(false);
        router.replace('/workspace'+'/'+workspaceId+'/'+docId)
        console.log("Data inserted");
    }
  return (
    <div className='p-10 md:px-36 lg:px-52 xl:px-80 py-28'>
    <div className='shadow-2xl rounded-xl'>
        <CoverPicker setNewCover={(v)=>{Setcoverpage(v)}}>
            <div className='relative group cursor-pointer'>
                <h2 className='hidden absolute p-2 w-full h-full group-hover:flex items-center justify-center font-bold'>Cover page</h2>
                <Image src= {coverpage} width={400} height={300} 
                    className='group-hover:opacity-45 w-full h-[250px] rounded-t-xl
                    object-cover'/>
            </div>
        </CoverPicker>

        <div className='p-12'>
            <h2 className='font-medium text-xl'>Create a new workspace</h2>
            <div className='mt-2 flex items-center gap-2'>
                <EmojiPickerComponent selectedEmoji={(v)=>setEmoji(v)}>
                    <Button variant="outline">
                        {emoji? emoji:<SmilePlus/>}
                    </Button>
                </EmojiPickerComponent>
                <Input placeholder = "Workspace Name"
                onChange={(e)=>setworkspaceName(e.target.value)}/>
            </div>
        </div>

        <div className='flex gap-2 justify-end p-2'>
            <Button disabled = {!workspaceName?.length || loading } onClick={onCoverChange}>
                Create {loading && <LoaderPinwheel className='animate-spin ml-2'/>}
            </Button>
            <Button variant = "outline">cancel</Button>
            

        </div>
    </div>
    </div>
  )
}

export default page
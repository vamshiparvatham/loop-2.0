"use client"
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseconfig';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { Progress } from "@/components/ui/progress"
import { toast } from 'sonner';
import NotificationBox from './NotificationBox';


function SideNav({params}) {
    const workspaceId = params?.workspaceId;
    const user = useUser();

    const [loading,setloading] = useState(false);

    const router = useRouter();
    
    
    const [documentList,setdocumentList] = useState([]);

    useEffect(()=>{
       params&&getDocument();
    },[workspaceId])

    const getDocument = ()=>{
        const q = query(collection(db,'DocumentId'),
        where('workspaceId','==',Number(workspaceId)));
        const unsubscribe = onSnapshot(q,(querysnapShot)=>{
            setdocumentList([]);
            querysnapShot.forEach((document)=>{
                
                setdocumentList(documentList=>[...documentList,document.data()])
            })
        })
    }

    const CreateNewDocument = async ()=>{
        if(documentList.length>=5){
            toast("Upgrade your plan",{
                description:"You have reached maximum files, please Upgrade",
                action:{
                    label:"Upgrade",
                    onClick:()=>console.log("Undo"),
                },
            });
            return;
        }
        setloading(true);
        
        const docId = uuidv4();
        
        await setDoc(doc(db,'DocumentId',docId.toString()),{
            DocumentName:"Untitled", 
            workspaceId:Number(workspaceId),
            emoji:null,
            coverImage:null,
            createdby:user?.user?.primaryEmailAddress?.emailAddress,
            docId:docId,
            documentOutput: []
        })

        await setDoc(doc(db,'DocumentOutput',docId.toString()),{
            output:[],
            docId:docId
        })


        setloading(false);
        router.replace('/workspace'+'/'+workspaceId+'/'+docId)
    }
    
  return (
    
    <div className='h-screen md:w-72 hidden md:block fixed bg-blue-50' >
        <div className='flex justify-between p-5 shadow-sm'>
            <Logo/>
            <NotificationBox>
                <Bell className='text-gray-950'/>
            </NotificationBox>
            
            <hr className='my-5'></hr>
        </div>
        <div>
            <div className='flex justify-between items-center p-3'>
            
                <h2 className='font-bold'>Workspace Name</h2>
                <Button onClick= {CreateNewDocument}size="sm">{loading?
                    <Loader2Icon className='h-4 w-4 animate-spin'/>:"+"}</Button>
            </div>
        </div>
        <div>
            <DocumentList documentList = {documentList} params = {params}/>
        </div>
        
        <div className='absolute bottom-10 w-[85%]'>
            <Progress value={documentList?.length*20}/>
            <h2 className='text-sm font-light my-2'><strong>{documentList.length} </strong>out of files <strong>5</strong> used</h2>
            <h2 className='text-sm font-light my-3'>Upgrade your plan for unlimited files</h2>
        </div>
        
        
    </div>
    
  )
}

export default SideNav
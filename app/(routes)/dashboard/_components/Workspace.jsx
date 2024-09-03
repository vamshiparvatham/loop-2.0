"use client"
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@clerk/nextjs'
import { AlignLeft, LayoutGrid } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import WorkspaceListitems from './WorkspaceListitems';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

const Workspace = () => {
    const {user}= useUser();
    const {orgId} = useAuth();
    const [WorkspaceList, setWorkspaceList] = useState([]);

    useEffect(()=>{
        user&&getWorkspaceList();
    },[orgId,user])

    const getWorkspaceList = async()=>{
        setWorkspaceList([]);
        const q = query(collection(db,'Workspace'),where('orgId','==',orgId?orgId:user?.primaryEmailAddress?.emailAddress))
        const querySnapShot= await getDocs(q);

        querySnapShot.forEach((doc)=>{
            // console.log(doc.data())
            setWorkspaceList(prev=>[...prev,doc.data()])
        })
    }
    console.log(user?.fullName)
  return (
    <div className='my-8 p-8 sm:px-24 md: px:36 xl:52'>
        <div className='flex justify-between px-3'>
            <h2 className='font-bold text-xl'>Hello, {user?.fullName}</h2>
            <Link href={'/createworkspace'}>
                <Button>+</Button>
            </Link>
            
        </div>
        <div className='mt-10 flex justify-between'>
            <h2 className='font-medium text-primary'>Workspaces</h2>
            <div className='flex gap-2'>
                <LayoutGrid/>
                <AlignLeft/>
            </div>
        </div>
            {WorkspaceList?.length == 0?
            <div className='my-10 flex flex-col justify-center items-center p-10'>
            <Image src = {'/workspace.jpeg'} width = {200} height={200}/>
            <h2 className='text-primary p-2 text-xl'>Create a new workspace</h2>
            <Link href={'/createworkspace'}>
                <Button className='font-bold' variant = "outline">+ New workspace</Button>
            </Link>
            
            </div>
            :<div>
                
                <WorkspaceListitems WorkspaceList = {WorkspaceList}/>
            </div>
            }
            
        
    </div>
  )
}

export default Workspace
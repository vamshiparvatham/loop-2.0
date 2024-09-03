"use client"
import React, { useEffect } from 'react'
import SideNav from '../../_components/SideNav';
import DocumentSectionEditor from '../../_components/DocumentSectionEditor';
import { Room } from '@/app/Room';
import { LiveblocksProvider } from '@liveblocks/react';


function page({params}) {
    useEffect(()=>{
        // console.log(params);
    },[params])
    console.log(params);
  return (
    
      <Room params = {params}>
        <div className=''>
          <div>
              <SideNav params={params}/>
          </div>
          <div className='md:ml-72'>
              <DocumentSectionEditor params = {params}/>
          </div> 
        </div>
      </Room>
   
    
  )
}

export default page
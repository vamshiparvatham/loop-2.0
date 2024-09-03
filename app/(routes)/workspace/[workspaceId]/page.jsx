import React from 'react'
import SideNav from '../_components/SideNav'
import Image from 'next/image'

function Workspace({params}) {
  return (
    <div className='flex gap-2'>
        <div>
            <SideNav params={params}/>
        </div>
        <div className='lg:absolute ml-[300px]'>
            
        </div>
    </div>
  )
}

export default Workspace
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

function WorkspaceListitems({WorkspaceList}) {
  console.log(WorkspaceList);
  const router = useRouter();
  const onClickWorkspaceItem=(workspaceId)=>{
    router.push('/workspace/'+workspaceId)

  }
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {WorkspaceList.map((item,index)=>(
        <div key={index} className='border shadow-xl rounded-xl hover:scale-105 transition-all cursor-pointer'
        onClick={()=>{onClickWorkspaceItem(item.id)}}>
          <Image className='h-[150px] object-cover rounded-t-2xl'
           src = {item.coverImage} width={400} height={200} alt='coverimage'/>
           <div className='p-4 rounded-t-2xl'>
            <h2 className='flex gap-2'>{item.emoji} {item.workspaceName}</h2>
          </div>
        </div>
      ))

      }
    </div>
  )
}

export default WorkspaceListitems
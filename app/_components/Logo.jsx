import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex justify gap-2'>
        
        <Image src= {'/Logo.png'} width={50} height={50} alt = "logo"/>
        <h2 className='font-bold text-xl'>Loop</h2>
    </div>
  )
}

export default Logo
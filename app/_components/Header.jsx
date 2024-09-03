"use client"
import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'


function Header() {
    
  return (
    <div className='flex justify-between p-5 shadow-md'>
        <Logo/>
        <div className='bg-primary rounded-lg p-2 text-sm'>
            <a href='/dashboard'>
            <span className='text-white'>Get Started</span></a>
        </div>
    </div>
  )
}

export default Header
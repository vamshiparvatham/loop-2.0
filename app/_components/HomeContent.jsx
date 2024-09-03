import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function HomeContent() {
    return (
        <div className='relative '>
            <div className="absolute inset-0 bg-cover bg-center h-screen"
                style={{ backgroundImage: "url('/background.jpg')" }}>
            </div>
            <div className="relative p-10 items-center justify-center h-full px-40 py-20">
                <div className="text-white text-center p-8 bg-black bg-opacity-50 rounded-lg">
                    <h1 className="text-4xl font-bold mb-4">
                    Loop is where <span className="text-primary dark:text-white">work happens, in sync.</span> </h1>
                    <p className="text-sm mt-8">
                    Microsoft Loop is a collaborative workspace that lets teams create, share, and work together on projects seamlessly. It combines flexible pages with reusable components that sync across different apps, making it easy to stay organized and up-to-date.
                    </p>
                </div>
                <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
                    <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
                    
                    </div>
                    <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The fastest on the market</h6>
                        
                    </div>
                    <div className="text-left">
                        <h6 className="text-lg font-semibold text-gray-700 dark:text-white">The most loved</h6>
                        
                    </div>
                </div>
                <div className='mt-20'>
                <div className='p-2 text-sm w-full h-11 text-center'>
            <a href='/dashboard'>
            <span className=' text-white'>Let's Get started</span></a>
        </div>
                </div>
            </div>

        </div>
    )
}

export default HomeContent
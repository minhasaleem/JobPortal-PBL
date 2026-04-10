import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20'>
      
      <div className='relative bg-linear-to-r from-violet-50 via-purple-50 to-blue-50 p-12 sm:p-24 lg:p-32 rounded-2xl shadow-lg border border-purple-100 overflow-hidden'>

        {/* Content */}
        <div className='z-10 relative'>
          <h1 className='text-2xl sm:text-4xl font-bold mb-8 max-w-md leading-snug text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600'>
            Download Mobile App For Better Experience
          </h1>

          <div className='flex gap-4'>
            
            <a href="#" className='inline-block transition-transform hover:scale-105'>
              <img className='h-12' src={assets.play_store} alt="" />
            </a>

            <a href="#" className='inline-block transition-transform hover:scale-105'>
              <img className='h-12' src={assets.app_store} alt="" />
            </a>

          </div>
        </div>

        {/* Image */}
        <img
          className='absolute w-80 right-0 bottom-0 mr-16 max-lg:hidden transition-transform duration-500 hover:scale-105'
          src={assets.app_main_img}
          alt=""
        />

      </div>
    </div>
  )
}

export default AppDownload

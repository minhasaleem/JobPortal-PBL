import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto mt-20'>
      
      <div className='flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-gray-200'>
        
        {/* Logo */}
        <img
          width={160}
          src={assets.logo}
          alt=""
          className='cursor-pointer transition-transform hover:scale-105'
        />

        {/* Text */}
        <p className='flex-1 text-center sm:text-left text-sm text-gray-500 max-sm:hidden'>
          All rights reserved. Copyright @job-portal
        </p>

        {/* Social Icons */}
        <div className='flex gap-3'>
          
          <img
            width={38}
            src={assets.facebook_icon}
            alt=""
            className='cursor-pointer transition-transform hover:scale-110'
          />

          <img
            width={38}
            src={assets.twitter_icon}
            alt=""
            className='cursor-pointer transition-transform hover:scale-110'
          />

          <img
            width={38}
            src={assets.instagram_icon}
            alt=""
            className='cursor-pointer transition-transform hover:scale-110'
          />

        </div>
      </div>
    </div>
  )
}

export default Footer

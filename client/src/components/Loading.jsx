import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-r from-blue-50 to-purple-50'>
      
      <div className='flex flex-col items-center gap-4'>

        {/* Spinner */}
        <div className='w-16 h-16 border-4 border-t-blue-600 border-purple-300 rounded-full animate-spin'></div>

        {/* Text */}
        <p className='text-gray-600 text-sm font-medium tracking-wide'>
          Loading, please wait...
        </p>

      </div>

    </div>
  )
}

export default Loading

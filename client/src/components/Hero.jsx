import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

  const { setSearchFilter, setIsSearched } = useContext(AppContext)

  const titleRef = useRef(null)
  const locationRef = useRef(null)

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
    setIsSearched(true)
  }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>

      {/* Hero Section */}
      <div className='bg-linear-to-r from-purple-800 via-purple-900 to-indigo-900 text-white py-16 text-center mx-2 rounded-2xl shadow-lg'>

        <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-snug'>
          Over 10,000+ jobs to apply
        </h2>

        <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5 text-gray-200'>
          Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
        </p>

        {/* Search Bar */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-xl text-gray-600 max-w-2xl px-4 py-2 mx-4 sm:mx-auto shadow-md'>

          {/* Title */}
          <div className='flex items-center gap-2 w-full'>
            <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
            <input
              type="text"
              placeholder='Search for jobs'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={titleRef}
            />
          </div>

          {/* Location */}
          <div className='flex items-center gap-2 w-full'>
            <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
            <input
              type="text"
              placeholder='Location'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={locationRef}
            />
          </div>

          {/* Button */}
          <button
            onClick={onSearch}
            className='bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg text-white w-full sm:w-auto'
          >
            Search
          </button>

        </div>
      </div>

      {/* Trusted Companies */}
      <div className='border border-gray-200 shadow-md mx-2 mt-6 p-6 rounded-xl bg-white'>
        <div className='flex justify-center items-center gap-8 lg:gap-14 flex-wrap'>

          <p className='font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600'>
            Trusted by
          </p>

          <img className="h-6 opacity-70 hover:opacity-100 transition" src={assets.microsoft_logo} alt="" />
          <img className="h-6 opacity-70 hover:opacity-100 transition" src={assets.walmart_logo} alt="" />
          <img className="h-6 opacity-70 hover:opacity-100 transition" src={assets.accenture_logo} alt="" />
          <img className="h-6 opacity-70 hover:opacity-100 transition" src={assets.samsung_logo} alt="" />
          <img className="h-6 opacity-70 hover:opacity-100 transition" src={assets.amazon_logo} alt="" />
          <img className="h-6 opacity-70 hover:opacity-100 transition" src={assets.adobe_logo} alt="" />

        </div>
      </div>

    </div>
  )
}

export default Hero

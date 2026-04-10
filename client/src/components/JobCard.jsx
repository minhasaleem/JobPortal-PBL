import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div className='border border-gray-200 p-6 shadow-md rounded-2xl bg-white hover:shadow-xl transition duration-300'>

      {/* Top */}
      <div className='flex justify-between items-center'>
        <img
          className='w-10 h-10 object-contain rounded'
          src={job.companyId.image}
          alt=""
        />
      </div>

      {/* Title */}
      <h4 className='font-semibold text-xl mt-3 text-gray-800'>
        {job.title}
      </h4>

      {/* Tags */}
      <div className='flex items-center gap-3 mt-3 text-xs flex-wrap'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full'>
          {job.location}
        </span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded-full'>
          {job.level}
        </span>
      </div>

      {/* Description */}
      <p
        className='text-gray-500 text-sm mt-4 leading-relaxed'
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      {/* Buttons */}
      <div className='mt-5 flex gap-3 text-sm'>
        
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`)
            scrollTo(0, 0)
          }}
          className='bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-4 py-2 rounded-lg transition'
        >
          Apply now
        </button>

        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`)
            scrollTo(0, 0)
          }}
          className='text-gray-600 border border-gray-300 hover:border-purple-500 hover:text-purple-600 px-4 py-2 rounded-lg transition'
        >
          Learn more
        </button>

      </div>
    </div>
  )
}

export default JobCard

import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'

const ManageJobs = () => {
  const navigate = useNavigate()

  const [jobs, setJobs] = useState(false)

  const { backendUrl, companyToken } = useContext(AppContext)

  //Function to fetch company Job Applications data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
        { headers: { token: companyToken } }
      )
      if (data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData);

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //funcion to change job visibility
  const changeJobVisibility = async (id) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/company/change-visibility',
        { id },
        { headers: { token: companyToken } }
      )
      if (data.success) {
        toast.success(data.message)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])
  return jobs ? jobs.length === 0 ? (
  <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl text-gray-600'>
      No Jobs Available or Posted
    </p>
  </div>
) : (
  <div className='container p-4 max-w-5xl'>

    <div className='bg-white rounded-xl shadow-sm border overflow-hidden'>

      {/* Header */}
      <div className='flex justify-between items-center px-6 py-4 border-b'>
        <h2 className='text-lg font-semibold text-gray-800'>
          Manage Jobs
        </h2>

        <button
          onClick={() => navigate('/dashboard/add-job')}
          className='bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition'
        >
          + Add Job
        </button>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full text-sm'>

          <thead className='bg-gray-50 text-gray-600'>
            <tr>
              <th className='py-3 px-4 text-left max-sm:hidden'>#</th>
              <th className='py-3 px-4 text-left'>Job Title</th>
              <th className='py-3 px-4 text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 text-center'>Applicants</th>
              <th className='py-3 px-4 text-center'>Visible</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={index}
                className='border-t hover:bg-gray-50 transition'
              >

                <td className='py-3 px-4 max-sm:hidden'>
                  {index + 1}
                </td>

                <td className='py-3 px-4 font-medium text-gray-800'>
                  {job.title}
                </td>

                <td className='py-3 px-4 text-gray-500 max-sm:hidden'>
                  {moment(job.date).format('ll')}
                </td>

                <td className='py-3 px-4 text-gray-500 max-sm:hidden'>
                  {job.location}
                </td>

                <td className='py-3 px-4 text-center font-medium'>
                  {job.applicants}
                </td>

                <td className='py-3 px-4 text-center'>
                  <input
                    onChange={() => changeJobVisibility(job._id)}
                    className='scale-125 cursor-pointer accent-purple-600'
                    type="checkbox"
                    checked={job.visible}
                  />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>

  </div>
) : <Loading />

}

export default ManageJobs

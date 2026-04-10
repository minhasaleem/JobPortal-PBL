import React, { useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useContext } from 'react'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

const ViewApplications = () => {

  const { backendUrl, companyToken } = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  //Function to fetch company Job Applications data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  //Function to update job Application Status
  const changeJobApplicationStatus = async (id, status) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )
      if (data.success) {
        fetchCompanyJobApplications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])
  return applicants ? applicants.length === 0 ? (
  <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl text-gray-600'>
      No Applications Available
    </p>
  </div>
) : (
  <div className='container mx-auto p-4 max-w-6xl'>

    <div className='bg-white rounded-xl shadow-sm border overflow-hidden'>

      {/* Header */}
      <div className='px-6 py-4 border-b'>
        <h2 className='text-lg font-semibold text-gray-800'>
          Job Applications
        </h2>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>

          <thead className='bg-gray-50 text-gray-600'>
            <tr>
              <th className='py-3 px-4 text-left'>#</th>
              <th className='py-3 px-4 text-left'>User</th>
              <th className='py-3 px-4 text-left max-sm:hidden'>Job Title</th>
              <th className='py-3 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 text-left'>Resume</th>
              <th className='py-3 px-4 text-center'>Status</th>
            </tr>
          </thead>

          <tbody>
            {applicants
              .filter(item => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr
                  key={index}
                  className='border-t hover:bg-gray-50 transition'
                >

                  <td className='py-3 px-4'>{index + 1}</td>

                  {/* User */}
                  <td className='py-3 px-4 flex items-center gap-3'>
                    <img
                      className='w-10 h-10 rounded-full object-cover border max-sm:hidden'
                      src={applicant.userId.image}
                      alt=""
                    />
                    <span className='font-medium text-gray-800'>
                      {applicant.userId.name}
                    </span>
                  </td>

                  <td className='py-3 px-4 text-gray-600 max-sm:hidden'>
                    {applicant.jobId.title}
                  </td>

                  <td className='py-3 px-4 text-gray-600 max-sm:hidden'>
                    {applicant.jobId.location}
                  </td>

                  {/* Resume */}
                  <td className='py-3 px-4'>
                    <a
                      href={applicant.userId.resume}
                      target="_blank"
                      rel="noreferrer"
                      className='inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition'
                    >
                      Resume
                      <img src={assets.resume_download_icon} alt="" />
                    </a>
                  </td>

                  {/* Status / Actions */}
                  <td className='py-3 px-4 text-center relative'>

                    {applicant.status === "Pending" ? (
                      <div className='relative inline-block group'>

                        <button className='text-gray-500 text-lg px-2'>
                          ⋮
                        </button>

                        <div className='hidden group-hover:block absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md z-10'>
                          <button
                            onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                            className='block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100'
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                            className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'
                          >
                            Reject
                          </button>
                        </div>

                      </div>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          applicant.status === 'Accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {applicant.status}
                      </span>
                    )}

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

export default ViewApplications

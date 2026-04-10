import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications
  } = useContext(AppContext)

  // 🔹 Update Resume
  const updateResume = async () => {

    if (!resume) {
      return toast.error("Please select a file")
    }

    try {
      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(
        backendUrl + '/api/users/update-resume',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
        setIsEdit(false)
        setResume(null)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log("FRONTEND ERROR:", error)
      toast.error(error.message)
    }
  }

  // 🔹 Fetch Applications
  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user])

  // 🔥 FIXED RETURN
  if (!userApplications) return null

  if (userApplications.length === 0) {
    return (
      <>
        <Navbar />
        <div className='flex items-center justify-center h-[70vh]'>
          <p className='text-xl sm:text-2xl'>
            No Job Applications Available
          </p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
  <Navbar />

  <div className='container px-4 2xl:px-20 mx-auto my-10 min-h-[65vh]'>

    {/* Resume Section */}
    <h2 className='text-2xl font-semibold text-gray-800'>Your Resume</h2>

    <div className='flex gap-3 mt-4 mb-8 flex-wrap'>

      {isEdit ? (
        <>
          <label
            className='flex items-center gap-2 cursor-pointer border border-gray-300 rounded-lg px-4 py-2 hover:border-purple-500 transition'
            htmlFor="resumeupload"
          >
            <p className='text-sm text-gray-600'>
              {resume ? resume.name : "Select Resume"}
            </p>

            <input
              id='resumeupload'
              onChange={e => setResume(e.target.files[0])}
              accept='application/pdf'
              type="file"
              hidden
            />

            <img className='w-5' src={assets.profile_upload_icon} alt="" />
          </label>

          <button
            onClick={updateResume}
            className='bg-linear-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-lg hover:opacity-90 transition shadow'
          >
            Save
          </button>
        </>
      ) : (
        <div className='flex gap-3 flex-wrap'>
          <a
            href={userData?.resume}
            target="_blank"
            rel="noreferrer"
            className='bg-blue-50 text-blue-600 px-5 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition'
          >
            View Resume
          </a>

          <button
            onClick={() => setIsEdit(true)}
            className='text-gray-600 border border-gray-300 rounded-lg px-5 py-2 hover:border-purple-500 hover:text-purple-600 transition'
          >
            Edit
          </button>
        </div>
      )}
    </div>

    {/* Applications Section */}
    <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
      Jobs Applied
    </h2>

    <div className='overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100'>

      <table className='min-w-full text-sm text-gray-700'>

        {/* Header */}
        <thead className='bg-gray-50 text-gray-600 text-sm'>
          <tr>
            <th className='py-4 px-5 text-left font-medium'>Company</th>
            <th className='py-4 px-5 text-left font-medium'>Job Title</th>
            <th className='py-4 px-5 text-left font-medium max-sm:hidden'>Location</th>
            <th className='py-4 px-5 text-left font-medium max-sm:hidden'>Date</th>
            <th className='py-4 px-5 text-left font-medium'>Status</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {userApplications.map((job, index) => (
            <tr
              key={index}
              className='hover:bg-gray-50 transition'
            >
              <td className='py-4 px-5 flex items-center gap-3 border-t'>
                <img
                  className='w-10 h-10 object-contain rounded'
                  src={job.companyId.image}
                  alt=""
                />
                <span className='font-medium text-gray-800'>
                  {job.companyId.name}
                </span>
              </td>

              <td className='py-4 px-5 border-t'>
                {job.jobId.title}
              </td>

              <td className='py-4 px-5 border-t max-sm:hidden'>
                {job.jobId.location}
              </td>

              <td className='py-4 px-5 border-t max-sm:hidden'>
                {moment(job.date).format('ll')}
              </td>

              <td className='py-4 px-5 border-t'>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                    job.status === 'Accepted'
                      ? 'bg-green-100 text-green-700'
                      : job.status === 'Rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {job.status || "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>

  </div>

  <Footer />
</>

  )
}

export default Applications

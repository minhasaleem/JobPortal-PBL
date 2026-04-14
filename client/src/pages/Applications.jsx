import React, { useContext, useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()
  const location = useLocation()

  const jobIdFromApply = location.state?.jobId

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications
  } = useContext(AppContext)

  // 🔹 Fetch data
  useEffect(() => {
    if (user) {
      fetchUserData()
      fetchUserApplications()
    }
  }, [user])

  // 🔹 Auto open upload if no resume
  useEffect(() => {
    if (userData && !userData.resume) {
      setIsEdit(true)
    }
  }, [userData])

  // 🔹 Update Resume + AUTO APPLY
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

        toast.success("Resume uploaded")

        await fetchUserData()

        // 🔥 AUTO APPLY AFTER UPLOAD
        if (jobIdFromApply) {

          const res = await axios.post(
            backendUrl + '/api/users/apply',
            { jobId: jobIdFromApply },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          if (res.data.success) {
            toast.success("Applied successfully")
            fetchUserApplications()
          } else {
            toast.error(res.data.message)
          }
        }

        setIsEdit(false)
        setResume(null)

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  if (!userApplications) return null

  return (
    <>
      {/* <Navbar /> */}

      <div className='container px-4 2xl:px-20 mx-auto my-10 min-h-[65vh]'>

        {/* Resume Section */}
        <h2 className='text-2xl font-semibold text-gray-800'>Your Resume</h2>

        <div className='flex gap-3 mt-4 mb-8 flex-wrap'>

          {isEdit ? (
            <>
              <label
                className='flex items-center gap-2 cursor-pointer border-2 border-dashed border-purple-400 rounded-lg px-4 py-3 hover:border-purple-600 transition'
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

              {userData?.resume && (
                <a
                  href={userData.resume}
                  target="_blank"
                  rel="noreferrer"
                  className='bg-blue-50 text-blue-600 px-5 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition'
                >
                  View Resume
                </a>
              )}

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

        {userApplications.length === 0 ? (
          <div className='flex items-center justify-center h-[40vh]'>
            <p className='text-lg text-gray-500'>
              No Job Applications Available
            </p>
          </div>
        ) : (
          <div className='overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100'>

            <table className='min-w-full text-sm text-gray-700'>

              <thead className='bg-gray-50 text-gray-600 text-sm'>
                <tr>
                  <th className='py-4 px-5 text-left'>Company</th>
                  <th className='py-4 px-5 text-left'>Job Title</th>
                  <th className='py-4 px-5 text-left max-sm:hidden'>Location</th>
                  <th className='py-4 px-5 text-left max-sm:hidden'>Date</th>
                  <th className='py-4 px-5 text-left'>Status</th>
                </tr>
              </thead>

              <tbody>
                {userApplications.map((job, index) => (
                  <tr key={index} className='hover:bg-gray-50'>
                    <td className='py-4 px-5 flex items-center gap-3 border-t'>
                      <img className='w-10 h-10 rounded' src={job.companyId.image} alt="" />
                      {job.companyId.name}
                    </td>
                    <td className='py-4 px-5 border-t'>{job.jobId.title}</td>
                    <td className='py-4 px-5 border-t max-sm:hidden'>{job.jobId.location}</td>
                    <td className='py-4 px-5 border-t max-sm:hidden'>{moment(job.date).format('ll')}</td>
                    <td className='py-4 px-5 border-t'>
                      <span className={`px-3 py-1 rounded ${
                        job.status === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : job.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {job.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

      <Footer />
    </>
  )
}

export default Applications

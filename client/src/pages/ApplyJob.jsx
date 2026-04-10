import React, { useContext, useEffect, useState } from 'react' 
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets} from '../assets/assets'
import kconvert from 'k-convert';
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth, useUser } from "@clerk/clerk-react";

const ApplyJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied,setIsAlreadyApplied] = useState(false)

  const { 
    jobs, backendUrl, userData, userApplications, fetchUserData, userLoading,fetchUserApplications} = useContext(AppContext)

  const { getToken } = useAuth();
  const { user } = useUser();

  // Fetch the job details
  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`)
      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Apply to job
  const applyHandler = async () => {
    try {
      console.log("USER DATA IN APPLY:", userData)

      if (!user) {
        return toast.error('Login to apply for jobs')
      }

      if (!userData || !userData.resume) {
        
        return toast.error('Upload resume to apply')
      }

      const token = await getToken()
      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () =>{
    const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)

  }
  useEffect(()=>{
    if (userApplications.length>0 && JobData) {
      checkAlreadyApplied()
    }
  },[JobData,userApplications,id])

  // Fetch job and user data
  useEffect(() => {
    fetchJob()
  }, [id])

  useEffect(() => {
    if (user) fetchUserData()
  }, [user])

  // 🔹 Render loading while job or user data is not ready
  if (!JobData) return <Loading />

  return (
  <>
    <Navbar />

    <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>

      <div className='bg-white rounded-2xl w-full shadow-md'>

        {/* Top Section */}
        <div className='flex justify-center md:justify-between flex-wrap gap-8 px-8 md:px-14 py-12 mb-6 
        bg-linear-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-2xl'>

          <div className='flex flex-col md:flex-row items-center'>
            <img
              className='h-24 bg-white rounded-xl p-4 mr-4 max-md:mb-4 border shadow-sm'
              src={JobData.companyId.image}
              alt=""
            />

            <div className='text-center md:text-left text-gray-700'>
              <h1 className='text-2xl sm:text-4xl font-semibold text-gray-800'>
                {JobData.title}
              </h1>

              <div className='flex flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-3'>

                <span className='flex items-center gap-2'>
                  <img src={assets.suitcase_icon} alt="" />
                  {JobData.companyId.name}
                </span>

                <span className='flex items-center gap-2'>
                  <img src={assets.location_icon} alt="" />
                  {JobData.location}
                </span>

                <span className='flex items-center gap-2'>
                  <img src={assets.person_icon} alt="" />
                  {JobData.level}
                </span>

                <span className='flex items-center gap-2'>
                  <img src={assets.money_icon} alt="" />
                  CTC: {kconvert.convertTo(JobData.salary)}
                </span>

              </div>
            </div>
          </div>

          {/* Apply Section */}
          <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>

            <button
              onClick={applyHandler}
              className='bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 
              transition text-white px-10 py-2.5 rounded-lg shadow'
            >
              {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
            </button>

            <p className='mt-2 text-gray-500'>
              Posted {moment(JobData.date).fromNow()}
            </p>

          </div>

        </div>

        {/* Bottom Section */}
        <div className='flex flex-col lg:flex-row justify-between items-start gap-10 px-2'>

          {/* Left */}
          <div className='w-full lg:w-2/3'>

            <h2 className='font-semibold text-2xl mb-4 text-gray-800'>
              Job Description
            </h2>

            <div
              className='rich-text text-gray-600 leading-relaxed'
              dangerouslySetInnerHTML={{ __html: JobData.description }}
            ></div>

            <button
              onClick={applyHandler}
              className='bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 
              transition text-white px-10 py-2.5 rounded-lg mt-10 shadow'
            >
              {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
            </button>

          </div>

          {/* Right */}
          <div className='w-full lg:w-1/3 space-y-5'>

            <h2 className='text-lg font-semibold text-gray-800'>
              More jobs from {JobData.companyId.name}
            </h2>

            {jobs
              .filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
              .filter(job => {
                const appliedJobsIds = new Set(
                  userApplications.map(app => app.jobId && app.jobId._id)
                )
                return !appliedJobsIds.has(job._id)
              })
              .slice(0, 4)
              .map((job, index) => (
                <JobCard key={index} job={job} />
              ))}

          </div>

        </div>

      </div>
    </div>

    <Footer />
  </>
)

}

export default ApplyJob

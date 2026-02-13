import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const ApplyJob = () => {

  const {id} = useParams()

  const [JobData,setJobData] = useState(null)

  const {jobs} = useContext(AppContext)

const fetchJob = async () =>{
  const data = jobs.filter(job => job._id === id)
  if (data.length !== 0){
    setJobData(data[0])
    console.log(data[0])
  }
}

useEffect(()=>{
  // if (jobs.length > 0) {
  //   const job = jobs.find(job => job._id === id)
  //   if (job) {
  //     setJobData(job)
  //     console.log(job)
  //   }
  // }
  if(jobs.length > 0){
    fetchJob()
  }
},[id,jobs])
// },[id,jobs])

  return false ? (
    <div>
      {/* chatgpt
        {JobData ? (
      <div>
        <h1>{JobData.title}</h1>
        <p>{JobData.location}</p>
        <div dangerouslySetInnerHTML={{ __html: JobData.description }} />
      </div>
    ) : (
      <p>Loading...</p>
    )} */}

    </div>
  ):(
    // <div className='min-h-screen flex items-center justify-center'>
    //   <div className='w-20 h-20 border-4 border-gray-400 rouned-full animate-spin'>
    //   </div>
    // </div>
    <Loading/>
  )
}

export default ApplyJob

import React, { useEffect, useRef, useState } from 'react'
import quill from 'quill'
import {JobCategories, JobLocations} from '../assets/assets'
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {

  const [title,setTitle] = useState('');
  const [location,setLocation] = useState('Banglore');
  const [category,setCategory] = useState('Programming');
  const [level,setLevel] = useState('Beginner level');
  const [salary,setSalary] = useState(0);

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const {backendUrl,companyToken} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const description = quillRef.current.root.innerHTML

      const {data} = await axios.post(backendUrl+'/api/company/post-job',
        {title,description,location,salary,category,level},
        {headers:{token:companyToken}}
      )
      if (data.success) {
        toast.success(data.message)
        setTitle('')
        setSalary(0)
        quillRef.current.root.innerHTML = ""
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    // Initiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new quill(editorRef.current,{
        theme:'snow',
      })
    }
  },[])

  return (
    <form onSubmit={onSubmitHandler} className='container px-4 2xl:px-20 mx-auto my-10 flex flex-col items-start gap-6'>

  <div className='w-full bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100'>

    {/* Title */}
    <div className='w-full'>
      <p className='mb-2 font-medium text-gray-700'>Job Title</p>
      <input
        onChange={e => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder='Type here'
        required
        className='w-full max-w-lg px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
      />
    </div>

    {/* Description */}
    <div className='w-full max-w-2xl mt-6'>
      <p className='mb-3 font-medium text-gray-700'>Job Description</p>
      <div
        ref={editorRef}
        className='bg-white border border-gray-300 rounded-lg min-h-37.5 p-2 focus-within:border-purple-500 transition'
      ></div>
    </div>

    {/* Dropdowns */}
    <div className='flex flex-col sm:flex-row gap-4 w-full mt-6'>

      <div className='w-full'>
        <p className='mb-2 font-medium text-gray-700'>Job Category</p>
        <select
          className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
          onChange={e => setCategory(e.target.value)}
        >
          {JobCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className='w-full'>
        <p className='mb-2 font-medium text-gray-700'>Job Location</p>
        <select
          className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
          onChange={e => setLocation(e.target.value)}
        >
          {JobLocations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className='w-full'>
        <p className='mb-2 font-medium text-gray-700'>Job Level</p>
        <select
          className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
          onChange={e => setLevel(e.target.value)}
        >
          <option value="Beginner Level">Beginner Level</option>
          <option value="Intermediate Level">Intermediate Level</option>
          <option value="Senior Level">Senior Level</option>
        </select>
      </div>

    </div>

    {/* Salary */}
    <div className='mt-6'>
      <p className='mb-2 font-medium text-gray-700'>Job Salary</p>
      <input
        min={0}
        className='w-full sm:w-40 px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
        onChange={e => setSalary(e.target.value)}
        type="number"
        placeholder='2500'
      />
    </div>

    {/* Button */}
    <button
      className='mt-8 px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow'
    >
      Add Job
    </button>

  </div>

</form>

  )
}

export default AddJob

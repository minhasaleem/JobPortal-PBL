import React, { useEffect, useRef, useState, useContext } from 'react'
import quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const AddJob = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('Banglore')
  const [category, setCategory] = useState('Programming')
  const [level, setLevel] = useState('Beginner Level')
  const [salary, setSalary] = useState(0)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const { backendUrl, companyToken } = useContext(AppContext)

  // Submit Job
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const description = quillRef.current.root.innerHTML

      const { data } = await axios.post(
        backendUrl + '/api/company/post-job',
        {
          title,
          description,
          location,
          salary,
          category,
          level
        },
        {
          headers: { token: companyToken }
        }
      )

      if (data.success) {
        toast.success("Job Added Successfully 🎉")

        setTitle('')
        setSalary(0)
        setLocation('Banglore')
        setCategory('Programming')
        setLevel('Beginner Level')

        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Load Quill Editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new quill(editorRef.current, {
        theme: 'snow'
      })
    }
  }, [])

  return (
    <form
      onSubmit={onSubmitHandler}
      className='container px-4 2xl:px-20 mx-auto my-10 flex flex-col items-start gap-6'
    >
      <div className='w-full bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100'>

        {/* Title */}
        <div className='w-full'>
          <p className='mb-2 font-medium text-gray-700'>Job Title</p>
          <input
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Type here'
            className='w-full max-w-lg px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
          />
        </div>

        {/* Description */}
        <div className='w-full max-w-2xl mt-6'>
          <p className='mb-3 font-medium text-gray-700'>Job Description</p>
          <div
            ref={editorRef}
            className='bg-white border border-gray-300 rounded-lg focus-within:border-purple-500 transition'
            style={{ minHeight: '200px' }}
          ></div>
        </div>

        {/* Dropdowns */}
        <div className='flex flex-col sm:flex-row gap-4 w-full mt-6'>

          {/* Category */}
          <div className='w-full'>
            <p className='mb-2 font-medium text-gray-700'>Job Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
            >
              {JobCategories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className='w-full'>
            <p className='mb-2 font-medium text-gray-700'>Job Location</p>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
            >
              {JobLocations.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div className='w-full'>
            <p className='mb-2 font-medium text-gray-700'>Job Level</p>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
            >
              <option value='Beginner Level'>Beginner Level</option>
              <option value='Intermediate Level'>Intermediate Level</option>
              <option value='Senior Level'>Senior Level</option>
            </select>
          </div>

        </div>

        {/* Salary */}
        <div className='mt-6'>
          <p className='mb-2 font-medium text-gray-700'>Job Salary</p>
          <input
            type='number'
            min={0}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder='2500'
            className='w-full sm:w-40 px-4 py-2.5 border border-gray-300 rounded-lg focus:border-purple-500 outline-none transition'
          />
        </div>

        {/* Button */}
        <button
          type='submit'
          className='mt-8 px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow'
        >
          Add Job
        </button>

      </div>
    </form>
  )
}

export default AddJob

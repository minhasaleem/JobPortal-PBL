import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(false)
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)
  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (state == "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true)
    }

    try {

      if (state === "Login") {

        // Hardcoded Admin Access Dashboard route
        if (email === 'admin@jobportal.com' && password === 'admin123') {
            setShowRecruiterLogin(false);
            navigate('/admin-dashboard');
            toast.success('Admin Authenticated');
            return;
        }
        const { data } = await axios.post('http://127.0.0.1:5000/api/company/login',
          { email, password }
        )

        if (data.success) {
          setCompanyData(data.company)
          setCompanyToken(data.token)
          localStorage.setItem('companyToken', data.token)
          setShowRecruiterLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }

      } else {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('password', password)
        formData.append('email', email)
        formData.append('image', image)

        const { data } = await axios.post(backendUrl + '/api/company/register', formData)
        if (data.success) {
          setCompanyData(data.company)
          setCompanyToken(data.token)
          localStorage.setItem('companyToken', data.token)
          setShowRecruiterLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'

    }
  }, [])
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-md bg-black/40 flex justify-center items-center px-4'>
  
  <form onSubmit={onSubmitHandler} className='relative bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md text-slate-600 transition-all'>

    {/* Title */}
    <h1 className='text-center text-2xl font-semibold text-gray-800'>
      Recruiter {state}
    </h1>
    <p className='text-sm text-center text-gray-500 mt-1'>
      Welcome back! Please sign in to continue
    </p>

    {/* Upload Logo */}
    {state === "Sign Up" && isTextDataSubmitted ? (
      <div className='flex items-center gap-4 my-8'>
        <label htmlFor="image" className='cursor-pointer'>
          <img
            className='w-16 h-16 rounded-full object-cover border shadow'
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
          <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
        </label>
        <p className='text-sm text-gray-600'>Upload Company Logo</p>
      </div>
    ) : (
      <>
        {/* Name */}
        {state !== 'Login' && (
          <div className='border border-gray-300 focus-within:border-purple-500 px-4 py-2 flex items-center gap-2 rounded-full mt-5 transition'>
            <img src={assets.person_icon} alt="" />
            <input
              className='outline-none text-sm w-full bg-transparent'
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              placeholder='Company Name'
              required
            />
          </div>
        )}

        {/* Email */}
        <div className='border border-gray-300 focus-within:border-purple-500 px-4 py-2 flex items-center gap-2 rounded-full mt-5 transition'>
          <img src={assets.email_icon} alt="" />
          <input
            className='outline-none text-sm w-full bg-transparent'
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Email Id'
            required
          />
        </div>

        {/* Password */}
        <div className='border border-gray-300 focus-within:border-purple-500 px-4 py-2 flex items-center gap-2 rounded-full mt-5 transition'>
          <img src={assets.lock_icon} alt="" />
          <input
            className='outline-none text-sm w-full bg-transparent'
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='Password'
            required
          />
        </div>
      </>
    )}

    {/* Forgot Password */}
    {state === 'Login' && (
      <p
        onClick={async () => {
          if (!email) return toast.error("Enter email first")

          const { data } = await axios.post(
            backendUrl + "/api/company/forgot-password",
            { email }
          )

          if (data.success) {
            toast.success("Reset link generated")
            window.location.href = data.resetLink
          } else {
            toast.error(data.message)
          }
        }}
        className='text-sm text-blue-600 mt-4 cursor-pointer hover:underline text-center'
      >
        Forgot password?
      </p>
    )}

    {/* Button */}
    <button
      type='submit'
      className='bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 w-full text-white py-2 rounded-full mt-5 transition'
    >
      {state === 'Login'
        ? 'Login'
        : isTextDataSubmitted
        ? 'Create Account'
        : 'Next'}
    </button>

    {/* Toggle */}
    {state === 'Login' ? (
      <p className='mt-5 text-center text-sm'>
        Don't have an account?{' '}
        <span
          className='text-purple-600 cursor-pointer hover:underline'
          onClick={() => setState("Sign Up")}
        >
          Sign Up
        </span>
      </p>
    ) : (
      <p className='mt-5 text-center text-sm'>
        Already have an account?{' '}
        <span
          className='text-purple-600 cursor-pointer hover:underline'
          onClick={() => setState("Login")}
        >
          Login
        </span>
      </p>
    )}

    {/* Close Button */}
    <img
      onClick={() => setShowRecruiterLogin(false)}
      className='absolute top-4 right-4 w-5 cursor-pointer hover:scale-110 transition'
      src={assets.cross_icon}
      alt=""
    />
  </form>
</div>
  )
}

export default RecruiterLogin

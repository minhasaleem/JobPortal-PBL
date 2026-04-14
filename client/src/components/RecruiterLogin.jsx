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

  const {
    setShowRecruiterLogin,
    backendUrl,
    setCompanyToken,
    setCompanyData,
    setAdminToken
  } = useContext(AppContext)

  // 🚀 FORM SUBMIT
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (state === "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true)
    }

    try {

      // =========================
      // 🔐 LOGIN
      // =========================
      if (state === "Login") {

        // ✅ ADMIN LOGIN
        if (email === 'admin@jobportal.com') {
          const { data } = await axios.post(
            backendUrl + '/api/admin/login',
            { email, password }
          )

          if (data.success) {
            setAdminToken(data.token)
            localStorage.setItem('adminToken', data.token)

            setShowRecruiterLogin(false)

            navigate('/admin-dashboard') // ✅ FIXED

            toast.success('Admin Authenticated')
          } else {
            toast.error(data.message)
          }
          return
        }

        // ✅ RECRUITER LOGIN
        const { data } = await axios.post(
          backendUrl + '/api/company/login',
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
      }

      // =========================
      // 📝 SIGNUP
      // =========================
      else {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('password', password)
        formData.append('email', email)
        formData.append('image', image)

        const { data } = await axios.post(
          backendUrl + '/api/company/register',
          formData
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
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // 🔒 Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className='fixed inset-0 z-50 backdrop-blur-md bg-black/40 flex justify-center items-center px-4'>

      <form
        onSubmit={onSubmitHandler}
        className='relative bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md text-slate-600'
      >

        {/* TITLE */}
        <h1 className='text-center text-2xl font-semibold text-gray-800'>
          Dashboard {state}
        </h1>
        <p className='text-sm text-center text-gray-500 mt-1'>
          Welcome back! Please sign in to continue
        </p>

        {/* IMAGE UPLOAD */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className='flex items-center gap-4 my-8'>
            <label htmlFor="image" className='cursor-pointer'>
              <img
                className='w-16 h-16 rounded-full object-cover border'
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
              <input
                onChange={e => setImage(e.target.files[0])}
                type="file"
                id='image'
                hidden
              />
            </label>
            <p>Upload Company Logo</p>
          </div>
        ) : (
          <>
            {/* NAME */}
            {state !== 'Login' && (
              <input
                type="text"
                placeholder='Company Name'
                value={name}
                onChange={e => setName(e.target.value)}
                className='w-full border px-4 py-2 mt-5 rounded-full'
                required
              />
            )}

            {/* EMAIL */}
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full border px-4 py-2 mt-5 rounded-full'
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full border px-4 py-2 mt-5 rounded-full'
              required
            />
          </>
        )}

        {/* FORGOT PASSWORD */}
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
            className='text-sm text-blue-600 mt-4 cursor-pointer text-center'
          >
            Forgot password?
          </p>
        )}

        {/* BUTTON */}
        <button className='w-full bg-purple-600 text-white py-2 mt-5 rounded-full'>
          {state === 'Login'
            ? 'Login'
            : isTextDataSubmitted
              ? 'Create Account'
              : 'Next'}
        </button>

        {/* TOGGLE */}
        {state === 'Login' ? (
          <p className='mt-5 text-center text-sm'>
            Don't have an account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-purple-600 cursor-pointer'>
              Sign Up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center text-sm'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-purple-600 cursor-pointer'>
              Login
            </span>
          </p>
        )}

        {/* CLOSE BUTTON */}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className='absolute top-4 right-4 w-5 cursor-pointer'
          src={assets.cross_icon}
          alt=""
        />
      </form>
    </div>
  )
}

export default RecruiterLogin

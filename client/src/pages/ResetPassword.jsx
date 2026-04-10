import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [validToken, setValidToken] = useState(true)

  // ✅ Fetch email using token
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/company/reset-password/${token}`
        )

        if (data.success) {
          setEmail(data.email)
        } else {
          setValidToken(false)
          toast.error(data.message)
        }

      } catch (error) {
        setValidToken(false)
        toast.error("Something went wrong")
      }
    }

    fetchEmail()
  }, [token])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!password) {
      return toast.error("Enter new password")
    }

    try {
      setLoading(true)

      const { data } = await axios.post(
        "http://localhost:5000/api/company/reset-password",
        {
          token,
          newPassword: password
        }
      )

      if (data.success) {
        toast.success("Password updated successfully")
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // ❌ If token invalid
if (!validToken) {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='bg-white shadow-md rounded-xl p-8 text-center'>
        <p className='text-red-500 text-lg font-medium'>
          Invalid or expired reset link
        </p>
      </div>
    </div>
  )
}

return (
  <div className='flex items-center justify-center min-h-screen bg-linear-to-r from-blue-50 to-purple-100 px-4'>

    <form
      onSubmit={submitHandler}
      className='bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md'
    >

      <h2 className='text-2xl font-semibold text-center text-gray-800 mb-2'>
        Reset Password
      </h2>

      <p className='text-sm text-gray-500 text-center mb-6'>
        Enter your new password below
      </p>

      {/* Email */}
      {email && (
        <p className='text-sm text-gray-500 mb-4 text-center'>
          Resetting password for: <b className='text-gray-700'>{email}</b>
        </p>
      )}

      {/* Input */}
      <div className='border border-gray-300 px-4 py-2 rounded-lg flex items-center mb-5 focus-within:border-purple-500'>
        <input
          type="password"
          placeholder="Enter new password"
          className='w-full outline-none text-sm'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className='w-full bg-linear-to-r from-blue-600 to-purple-600 
        hover:opacity-90 transition text-white py-2 rounded-lg shadow'
      >
        {loading ? "Updating..." : "Reset Password"}
      </button>

    </form>
  </div>
)

}

export default ResetPassword

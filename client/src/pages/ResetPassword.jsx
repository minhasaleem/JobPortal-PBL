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
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-red-500 text-lg'>
          Invalid or expired reset link
        </p>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={submitHandler}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'
      >
        <h2 className='text-2xl font-semibold mb-4 text-center'>
          Reset Password
        </h2>

        {/* ✅ Show email */}
        {email && (
          <p className='text-sm text-gray-500 mb-4 text-center'>
            Resetting password for: <b>{email}</b>
          </p>
        )}

        <input
          type="password"
          placeholder="Enter new password"
          className='w-full border px-4 py-2 rounded mb-4 outline-none'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword

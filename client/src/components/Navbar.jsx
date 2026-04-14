import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user, isLoaded } = useUser()

  const navigate = useNavigate()
  const { setShowRecruiterLogin } = useContext(AppContext)

  if (!isLoaded) return null

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center py-4">

        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className="cursor-pointer max-sm:w-32 transition-transform duration-300 hover:scale-105"
          src={assets.logo}
          alt="logo"
        />

        {user ? (
          <div className='flex items-center gap-4'>

            <Link
              to="/applications"
              className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-80 transition"
            >
              Applied Jobs
            </Link>

            <p className='max-sm:hidden font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600'>
              Hi, {user.firstName} {user.lastName}
            </p>

            <UserButton />

          </div>
        ) : (
          <div className="flex gap-4 items-center max-sm:text-xs">

            {/* ✅ Unified Login for Admin + Recruiter */}
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="relative px-5 py-2 rounded-full font-semibold text-purple-600 
  border border-purple-200 bg-white/60 backdrop-blur-md
  hover:bg-linear-to-r hover:from-purple-600 hover:to-indigo-600
  hover:text-white hover:border-transparent
  transition-all duration-300 ease-in-out
  shadow-sm hover:shadow-lg hover:scale-105"
            >
              Dashboard Login
            </button>

            {/* ✅ Normal User Login */}
            <button
              type="button"
              onClick={() => openSignIn()}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-6 sm:px-9 py-2 rounded-full shadow-md transition"
            >
              Login
            </button>

          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar

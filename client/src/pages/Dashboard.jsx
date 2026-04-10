import React, { useEffect, useContext } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

  const navigate = useNavigate()

  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)

  // Logout function
  const logout = () => {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  // Redirect to manage jobs after login
  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/manage-jobs', { replace: true })
    }
  }, [companyData])

  return (
  <div className='min-h-screen bg-gray-50'>

    {/* Navbar */}
    <div className='bg-white shadow-sm py-4'>
      <div className='px-5 flex justify-between items-center'>

        <img
          onClick={() => navigate('/')}
          className='max-sm:w-32 cursor-pointer transition-transform hover:scale-105'
          src={assets.logo}
          alt=""
        />

        {companyData && (
          <div className='flex items-center gap-4'>

            <p className='max-sm:hidden font-medium text-gray-700'>
              Welcome, <span className='text-purple-600'>{companyData.name}</span>
            </p>

            <div className='relative group'>
              <img
                className='w-9 h-9 border rounded-full object-cover cursor-pointer'
                src={companyData.image}
                alt=""
              />

              {/* Dropdown */}
              <div className='absolute hidden group-hover:block right-0 mt-2 z-10'>
                <ul className='bg-white shadow-md rounded-lg border text-sm py-2 w-32'>
                  <li
                    onClick={logout}
                    className='px-4 py-2 hover:bg-red-50 hover:text-red-600 cursor-pointer'
                  >
                    Logout
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>

    {/* Main Layout */}
    <div className='flex'>

      {/* Sidebar */}
      <div className='w-16 sm:w-56 min-h-screen bg-white border-r shadow-sm'>

        <ul className='flex flex-col text-gray-700'>

          <NavLink
            to='/dashboard/add-job'
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition ${
                isActive
                  ? 'bg-linear-to-r from-blue-100 to-purple-100 border-r-4 border-purple-500'
                  : ''
              }`
            }
          >
            <img className='w-5' src={assets.add_icon} alt="" />
            <p className='hidden sm:block'>Add Job</p>
          </NavLink>

          <NavLink
            to='/dashboard/manage-jobs'
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition ${
                isActive
                  ? 'bg-linear-to-r from-blue-100 to-purple-100 border-r-4 border-purple-500'
                  : ''
              }`
            }
          >
            <img className='w-5' src={assets.home_icon} alt="" />
            <p className='hidden sm:block'>Manage Jobs</p>
          </NavLink>

          <NavLink
            to='/dashboard/view-applications'
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition ${
                isActive
                  ? 'bg-linear-to-r from-blue-100 to-purple-100 border-r-4 border-purple-500'
                  : ''
              }`
            }
          >
            <img className='w-5' src={assets.person_tick_icon} alt="" />
            <p className='hidden sm:block'>View Applications</p>
          </NavLink>

        </ul>
      </div>

      {/* Right Content */}
      <div className='flex-1 p-4 sm:p-6'>
        <div className='bg-white rounded-xl shadow-sm p-4 min-h-[80vh]'>
          <Outlet />
        </div>
      </div>

    </div>
  </div>
)

}

export default Dashboard

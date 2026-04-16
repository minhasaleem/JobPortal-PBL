import React, { useEffect, useContext, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {
  const navigate = useNavigate()

  const {
    companyData,
    setCompanyData,
    setCompanyToken
  } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)

  // Logout
  const logout = () => {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  // Redirect after login
  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/manage-jobs', { replace: true })
    }
  }, [companyData])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP NAVBAR */}
      <div className="bg-white shadow-sm py-4 border-b">
        <div className="px-5 flex justify-between items-center">

          {/* Logo */}
          <img
            onClick={() => navigate('/')}
            className="max-sm:w-32 cursor-pointer transition-transform hover:scale-105"
            src={assets.logo}
            alt=""
          />

          {/* Right Side */}
          {companyData && (
            <div className="flex items-center gap-4">

              <p className="hidden sm:block font-medium text-gray-700">
                Welcome,{" "}
                <span className="text-purple-600 font-semibold">
                  {companyData.name}
                </span>
              </p>

              {/* PROFILE + DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
              >
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-200 cursor-pointer"
                  src={companyData.image}
                  alt=""
                />

                {/* Dropdown */}
                {showMenu && (
                  <div className="absolute right-0 top-full pt-2 w-40 z-50">
                    <div className="bg-white rounded-xl shadow-xl border overflow-hidden">

                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>

                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-16 sm:w-56 min-h-screen bg-white border-r shadow-sm">

          <ul className="flex flex-col text-gray-700">

            {/* Add Job */}
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition ${
                  isActive
                    ? 'bg-linear-to-r from-blue-100 to-purple-100 border-r-4 border-purple-500'
                    : ''
                }`
              }
            >
              <img className="w-5" src={assets.add_icon} alt="" />
              <p className="hidden sm:block">Add Job</p>
            </NavLink>

            {/* Manage Jobs */}
            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition ${
                  isActive
                    ? 'bg-linear-to-r from-blue-100 to-purple-100 border-r-4 border-purple-500'
                    : ''
                }`
              }
            >
              <img className="w-5" src={assets.home_icon} alt="" />
              <p className="hidden sm:block">Manage Jobs</p>
            </NavLink>

            {/* Applications */}
            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition ${
                  isActive
                    ? 'bg-linear-to-r from-blue-100 to-purple-100 border-r-4 border-purple-500'
                    : ''
                }`
              }
            >
              <img className="w-5" src={assets.person_tick_icon} alt="" />
              <p className="hidden sm:block">Applications</p>
            </NavLink>

          </ul>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 min-h-[80vh]">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard


import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob.jsx'
import Applications from './pages/Applications.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {

  const { showRecruiterLogin, companyToken } = useContext(AppContext)
  const location = useLocation()

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />

      {/* ✅ SHOW NAVBAR ONLY FOR NON-ADMIN */}
      {!location.pathname.startsWith('/admin-dashboard') && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        <Route path='/dashboard' element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path='add-job' element={<AddJob />} />
              <Route path='manage-jobs' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplications />} />
            </>
          ) : null}
        </Route>
      </Routes>
    </div>
  )
}
export default App

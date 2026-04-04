import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import ResetPassword from './pages/ResetPassword'
import 'quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const { showRecruiterLogin, companyToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />

      <Routes>
        {/* ✅ Normal routes */}
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />

        {/* ✅ FIXED: Reset route OUTSIDE dashboard */}
        <Route path='/reset-password/:token' element={<ResetPassword />} />

        {/* ✅ Dashboard routes */}
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

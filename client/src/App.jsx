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
      <ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
  toastStyle={{
    zIndex: 99999
  }}
/>

      {/* ✅ SHOW NAVBAR ONLY FOR NON-ADMIN */}
      {!location.pathname.startsWith('/admin-dashboard') &&
        !location.pathname.startsWith('/dashboard') && <Navbar />}

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
// import React, { useContext } from 'react'
// import { Routes, Route, useLocation } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import RecruiterLogin from './components/RecruiterLogin'

// import { AppContext } from './context/AppContext'

// import Home from './pages/Home'
// import ApplyJob from './pages/ApplyJob'
// import Applications from './pages/Applications'
// import AdminDashboard from './pages/AdminDashboard'
// import Dashboard from './pages/Dashboard'
// import AddJob from './pages/AddJob'
// import ManageJobs from './pages/ManageJobs'
// import ViewApplications from './pages/ViewApplications'
// import ResetPassword from './pages/ResetPassword'

// const App = () => {
//   const { showRecruiterLogin, companyToken } = useContext(AppContext)
//   const location = useLocation()

//   const isAdminPage = location.pathname.startsWith('/admin-dashboard')
//   const isRecruiterPage = location.pathname.startsWith('/dashboard')

//   return (
//     <div className='min-h-screen flex flex-col bg-gray-50'>

//       {/* Popup Login */}
//       {showRecruiterLogin && <RecruiterLogin />}

//       {/* Toast */}
//       <ToastContainer
//         position='top-right'
//         autoClose={2500}
//         newestOnTop
//         theme='light'
//       />

//       {/* Navbar */}
//       {/* Hide on admin + recruiter dashboard */}
//       {!isAdminPage && !isRecruiterPage && <Navbar />}

//       {/* Main Content */}
//       <div className='flex-1'>

//         <Routes>

//           {/* Public Pages */}
//           <Route path='/' element={<Home />} />
//           <Route path='/apply-job/:id' element={<ApplyJob />} />
//           <Route path='/applications' element={<Applications />} />
//           <Route path='/reset-password/:token' element={<ResetPassword />} />

//           {/* Admin */}
//           <Route path='/admin-dashboard' element={<AdminDashboard />} />

//           {/* Recruiter Dashboard */}
//           <Route path='/dashboard' element={<Dashboard />}>
//             {companyToken ? (
//               <>
//                 <Route path='add-job' element={<AddJob />} />
//                 <Route path='manage-jobs' element={<ManageJobs />} />
//                 <Route path='view-applications' element={<ViewApplications />} />
//               </>
//             ) : null}
//           </Route>

//         </Routes>

//       </div>

//       {/* Footer */}
//       {/* Hide only on admin */}
//       {!isAdminPage && <Footer />}

//     </div>
//   )
// }

// export default App


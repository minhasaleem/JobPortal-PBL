// import React from 'react'
// import { assets } from '../assets/assets'
// import { useClerk ,UserButton , useUser } from '@clerk/clerk-react'

// const Navbar = () => {
//     // const {openSignIn} = useClerk()
//         const {openSignIn, loaded} = useClerk()
//         const {isSignedIn} = useUser()

//   return (
//     <div className='shadow py-4 '>
//       <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
//         <img src={assets.logo} alt=''/>
//         <div className='flex gap-4 max-sm:text-xs'>
//             <button className='text-gray-600'>Recruiter Login</button>
//             {/* <button type="button" onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer pointer-events-auto'>Login</button> */}
//                 {/* <button className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button> */}
//                 {!isSignedIn && (
//                  <button
//                    type="button"
//   onClick={() => {
//     console.log('CLICK WORKS')
//     alert('clicked')
//   }}
//   className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer"
// > 
//    Login 
// </button> 
//                 )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

// import { assets } from '../assets/assets'
// import { useClerk, useUser } from '@clerk/clerk-react'

// const Navbar = () => {
//   const { openSignIn, loaded } = useClerk()
//   const { isSignedIn } = useUser()

//   return (
//     <div className="shadow py-4">
//       <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
//         <img src={assets.logo} alt="" />

//         <div className="flex gap-4 max-sm:text-xs">
//           <button className="text-gray-600">
//             Recruiter Login
//           </button>

//           {/* Show loading placeholder instead of null */}
//           {!loaded ? (
//             <button className="bg-gray-300 text-white px-6 py-2 rounded-full cursor-not-allowed">
//               Loading...
//             </button>
//           ) : !isSignedIn ? (
//             <button
//               type="button"
//               onClick={() => openSignIn()}
//               className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
//             >
//               Login
//             </button>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

// import { assets } from '../assets/assets'
// import { useClerk, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'

// const Navbar = () => {
//   const { openSignIn } = useClerk()
//   const {user} = useUser()

//   return (
//     <div className="shadow py-4">
//       <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
//         <img src={assets.logo} alt="logo" />
//         {
//           user
//           ?<div>
//             <Link to={'/applications'}>Applied Jobs</Link>
//             <p></p>
//             <p>Hi,{user.firstName+" "+user.lastName}</p>
//             <UserButton />
//           </div>
//           :<div className="flex gap-4 items-center max-sm:text-xs">
//           <button className="text-gray-600">
//             Recruiter Login
//           </button>

//           {/* Show login only when signed OUT */}
//           <SignedOut>
//             <button
//               type="button"
//               onClick={() => openSignIn()}
//               className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
//             >
//               Login
//             </button>
//           </SignedOut>

//           {/* Show user button when signed IN */}
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>
//         }

        
//       </div>
//     </div>
//   )
// }

// export default Navbar
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user, isLoaded } = useUser()

  // ⛔ wait until Clerk is fully loaded
  if (!isLoaded) return null

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img src={assets.logo} alt="logo" />

        {user ? (
          <div className='flex items-center gap-3'>
            <Link to="/applications">Applied Jobs</Link>
            <p>Hi, {user.firstName} {user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 items-center max-sm:text-xs">
            <button className="text-gray-600">
              Recruiter Login
            </button>

            <button
              type="button"
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
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




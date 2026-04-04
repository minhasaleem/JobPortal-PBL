import express from 'express'
import { ChangeJobApplicationsStatus, ChangeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'
//forgot password
import { forgotPassword, resetPassword } from '../controllers/companyController.js'
import { getCompanyByToken } from '../controllers/companyController.js'


const router = express.Router()

//Register a company
router.post('/register',upload.single('image'), registerCompany)

//Company Login
router.post('/login',loginCompany)

//Get Company data
router.get('/company', protectCompany, getCompanyData)

//Post a job 
router.post('/post-job',protectCompany,postJob)

//Get Applicants Data of Company
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//Get Company Job List
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//Change Application Status
router.post('/change-status',protectCompany,ChangeJobApplicationsStatus)

//Change Applications Visibility
router.post('/change-visibility',protectCompany,ChangeVisibility)

//forgot password
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/reset-password/:token', getCompanyByToken)



export default router
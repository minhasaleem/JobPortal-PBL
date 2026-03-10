import express from 'express'
import { applyForJob, getUserData, updateUserResume ,getUserJobApplications } from '../controllers/userController.js'

const router = express.Router()

//Get user Data
router.get('/user',getUserData)

//Apply for a job
router.post('/apply',applyForJob)

//get applied job data
router.get('/applications',getUserJobApplications)

//Update user Profile (resume)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;
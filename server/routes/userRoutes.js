import express from 'express'
import { applyForJob, getUserData, updateUserResume ,getUserJobApplications } from '../controllers/userController.js'
import multer from 'multer'

const router = express.Router()
const storage = multer.diskStorage({})
const upload = multer({storage})

//Get user Data
router.get('/user',getUserData)

//Apply for a job
router.post('/apply',applyForJob)

//get applied job data
router.get('/applications',getUserJobApplications)

//Update user Profile (resume)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;
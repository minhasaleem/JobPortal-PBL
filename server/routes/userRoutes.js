import express from 'express'
import { applyForJob, getUserData, updateUserResume ,getUserJobApplications } from '../controllers/userController.js'
import multer from 'multer'
//error fix
import {requireAuth} from '@clerk/express'

const router = express.Router()
const storage = multer.diskStorage({})
const upload = multer({storage})

//add requireAuth() for all routes (error fix)
//Get user Data
router.get('/user', getUserData)

//Apply for a job
router.post('/apply',requireAuth(),applyForJob)

//get applied job data
router.get('/applications',requireAuth(),getUserJobApplications)

//Update user Profile (resume)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;
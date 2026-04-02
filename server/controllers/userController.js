import JobApplication from "../models/jobApplication.js"
import User from "../models/User.js"
import Job from "../models/Job.js"
import {v2 as cloudinary} from "cloudinary"


//Get user data
// export const getUserData = async (req,res)=>{

//     const userId = req.auth.userId

//     try {
//         const user = await User.findById(userId)

//         if(!user){
//             return res.json({success:false,message:'User not found'})
//         }

//         res.json({success:true,user})
//     } catch (error) {
//         res.json({success:false,message:error.message})
//     }
// }
export const getUserData = async (req,res)=>{

    const userId = req.auth.userId

    try {
        let user = await User.findOne({ clerkId: userId })

        // 🔥 FIX: create user if not exists
        if (!user) {
            user = await User.create({
                clerkId: userId,
                email: req.auth.sessionClaims.email
            })
        }

        res.json({ success:true, user })

    } catch (error) {
        res.json({ success:false, message:error.message })
    }
}



//Apply for a job
export const applyForJob = async (req,res) =>{

    const {jobId} = req.body
    const userId = req.auth.userId

    try {
        const isAlreadyApllied = await JobApplication.find({jobId,userId})

        if (isAlreadyApllied.length > 0) {
            return res.json({success:false, message:'Already Apllied'})
        } 
        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({success:false,message:'Job Not Found'})
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({success:true,message:'Applied Successfully'})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//Get user applied applications
export const getUserJobApplications = async (req,res) => {
    try {
        const userId = req.auth.userId

        const applications = await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()

        if (!applications) {
            return res.json({succes:false,message: 'No job apllications found for this user'})
        }
        return res.json({success:true,applications})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//update user profile(resume)
export const updateUserResume = async (req,res) => {
    try {
        const userId = req.auth.userId

        const resumeFile = req.resumeFile

        // const userData = await User.findById(userId)
        const userData = await User.findOne({ clerkId: userId })


        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success:true,message:'Resume Updated'})
    } catch (error) {
      res.json({success:false,message:error.message})   
    }
}
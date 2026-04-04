import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from '../models/Job.js'
import JobApplication from '../models/JobApplication.js'
import crypto from "crypto"

//Register a new company
export const registerCompany = async (req,res) =>{

 const {name,email,password} = req.body

  const imageFile = req.file;

//  const imageFile = req.file.filename;

 if (!name || !email || !password || !imageFile) {
    return res.json({success:false,message:"Missing Details"})
 }

 try{
    const companyExists = await Company.findOne({email})

    if (companyExists){
        return res.json({success:false, message:'Company Already Registered'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path)
    const company = await Company.create({
      name,
      email,
      password : hashPassword,
      image: imageUpload.secure_url
    })

    res.json({
      success: true,
      company :{
         _id: company._id,
         name: company.name,
         email: company.email,
         image: company.image
      },
      token: generateToken(company._id)
    })

 } catch (error) {
   res.json({success:false,message:error.message})
 }

}

//error fix:
export const loginCompany = async (req,res) => {
// console.log("🔥 LOGIN HIT", req.body)

   const {email,password}  = req.body

   try {
      const company = await Company.findOne({email})

      // 🔴 check if company exists
      if (!company) {
         return res.json({ success: false, message: "Company not found" })
      }
 if (!company.password) {
         console.log("❌ No password found in DB")
         return res.status(500).json({
            success:false,
            message:"Company password missing"
         })
      }
      // 🔴 await is REQUIRED
      const isMatch = await bcrypt.compare(password, company.password)

      // console.log("👉 isMatch:", isMatch)

      if (isMatch) {
         return res.json({
            success:true,
            company:{
               _id: company._id,
               name: company.name,
               email: company.email,
               image: company.image,
               date: Date.now()
            },
            token:generateToken(company._id)
         })
      } 
        return res.json({
            success:false,
            message:'Invalid email or password'
         })
      

   } catch (error) {
      console.log("LOGIN ERROR:",error) // 👈 add this
      return res.status(500).json({ success:false, message:error.message })
   }
}


//Get company data
export const getCompanyData = async (req,res) => {

   try {
      const company = req.company

      res.json({success:true,company})
   } catch (error) {
      res.json({success:false,message:error.message})
   }
}

//Post a new job
export const postJob = async (req,res) => {

   const {title,description,location,salary,level,category} = req.body

   const companyId = req.company._id

   try {
      const newJob = new Job({
         title,
         description,
         location,
         salary,
         companyId,
         date: Date.now(),
         level,
         category
      })

      await newJob.save()

      res.json({success:true, newJob})

   } catch (error) {
      
   res.json({success:false,message:error.message})

   }
}

//Get Company Job Applicants
export const getCompanyJobApplicants = async (req,res) =>{
   try {
      const companyId = req.company._id

      //Find job applications for the user and populate related data
      const applications = await JobApplication.find({companyId})
      .populate('userId','name image resume')
      .populate('jobId','title location category level salary')
      .exec()

      return res.json({success:true,applications})
   } catch (error) {
      res.json({success:false,message:error.message})
   }
}

//Get Company Posted Jobs
export const getCompanyPostedJobs = async (req,res) =>{
   try {
      const companyId = req.company._id

      const jobs = await Job.find({companyId})

      //Adding No. of applicants info in data
      const jobsData = await Promise.all(jobs.map(async (job)=>{
         const applicants = await JobApplication.find({jobId: job._id});
         return {...job.toObject(),applicants:applicants.length}
      }))

      res.json({success:true,jobsData})

   } catch (error) {
      res.json({success:false,message:error.message})
   }
}

//Change Job Application Status
export const ChangeJobApplicationsStatus = async (req,res) =>{

   try {
      const {id,status} = req.body

   //Find Job application and update status
   await JobApplication.findOneAndUpdate({_id : id},{status})

   res.json({success:true,message:'Status Changed'})

   } catch (error) {
      res.json({success:false,message:error.message})
   }
}

//Change Job Visibility
export const ChangeVisibility = async (req,res) => {
   try {
      
      const {id} = req.body

      const companyId = req.company._id

      const job = await Job.findById(id)

      if (companyId.toString() === job.companyId.toString()) {
         job.visible = !job.visible
      }

      await job.save()

      res.json({success:true,job})

   } catch (error) {
      res.json({success:false,message:error.message})
   }
}
//for forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const company = await Company.findOne({ email })

    if (!company) {
      return res.json({ success: false, message: "Email not found" })
    }

    const token = crypto.randomBytes(32).toString("hex")

    company.resetToken = token
    company.resetTokenExpire = Date.now() + 15 * 60 * 1000

    await company.save()

    const resetLink = `http://localhost:5173/reset-password/${token}`

    console.log("RESET LINK:", resetLink)

    res.json({
      success: true,
      message: "Reset link generated",
      resetLink
    })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    const company = await Company.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    })

    if (!company) {
      return res.json({ success: false, message: "Invalid or expired token" })
    }

    const salt = await bcrypt.genSalt(10)
    company.password = await bcrypt.hash(newPassword, salt)

    company.resetToken = undefined
    company.resetTokenExpire = undefined

    await company.save()

    res.json({ success: true, message: "Password reset successful" })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
export const getCompanyByToken = async (req, res) => {
  try {
    const { token } = req.params

    const company = await Company.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    })

    if (!company) {
      return res.json({ success: false, message: "Invalid or expired token" })
    }

    res.json({
      success: true,
      email: company.email
    })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

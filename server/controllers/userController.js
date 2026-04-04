import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import Job from "../models/Job.js"
import {v2 as cloudinary} from "cloudinary"

export const getUserData = async (req, res) => {
  try {
    const { userId, sessionClaims } = req.auth;

    let user = await User.findById(userId); // ✅ use _id

    if (!user) {
      user = await User.create({
        _id: userId,
        email: sessionClaims?.email || userId + "@clerk.dev",
        name: "User",
        image: "",
        resume: ""
      });
    }

    res.json({ success: true, user });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

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

export const updateUserResume = async (req, res) => {
  try {
    const { userId } = req.auth;

    const userData = await User.findById(userId); // ✅ use _id

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "No file received" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
  resource_type: "auto",   // ✅ THIS is the real fix
});

    console.log("NEW RESUME URL:", upload.secure_url)

    userData.resume = upload.secure_url;

    await userData.save();

    res.json({ success: true, message: "Resume Updated", resume: userData.resume });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';
import User from '../models/User.js';

export const getAdminStats = async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();
        const totalApplications = await JobApplication.countDocuments();
        const totalUsers = await User.countDocuments();

        res.json({ success: true, stats: { totalJobs, totalApplications, totalUsers } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAdminUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).populate('companyId', 'name image email');
        res.json({ success: true, jobs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAdminApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find({})
            .populate('userId', 'name email image')
            .populate('jobId', 'title location');
        res.json({ success: true, applications });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

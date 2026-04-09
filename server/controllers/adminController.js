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

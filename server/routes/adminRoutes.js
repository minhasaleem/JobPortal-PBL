import express from 'express';
import { getAdminStats, getAdminUsers, getAdminJobs, getAdminApplications } from '../controllers/adminController.js';

const router = express.Router();

router.get('/stats', getAdminStats);
router.get('/users', getAdminUsers);
router.get('/jobs', getAdminJobs);
router.get('/applications', getAdminApplications);

export default router;

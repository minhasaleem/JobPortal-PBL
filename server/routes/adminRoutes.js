import express from 'express';
import { getAdminStats, getAdminUsers, getAdminJobs, getAdminApplications, loginAdmin } from '../controllers/adminController.js';
import { authAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/stats', authAdmin, getAdminStats);
router.get('/users', authAdmin, getAdminUsers);
router.get('/jobs', authAdmin, getAdminJobs);
router.get('/applications', authAdmin, getAdminApplications);

export default router;

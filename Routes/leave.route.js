import express from 'express';
import { getAllLeaves, getLeaveById, createLeave, updateLeave } from '../controller/leave.controller.js';
import { verifyAdminorManager } from '../mildware/verify.token.js';

const router = express.Router();

router.get('/leave' ,verifyAdminorManager, getAllLeaves);
router.get('/leave/myleaves', getLeaveById);
router.post('/leave',createLeave);
router.patch('/leave/:id/approve',verifyAdminorManager, updateLeave);

export default router;
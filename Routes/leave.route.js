import express from 'express';
import { getAllLeaves, getLeaveById, createLeave, updateLeave } from '../Controller/leave.controller.js';
import { verifyAdminorManager } from '../mildware/verify.token.js';

const router = express.Router();

router.get('/leave' ,verifyAdminorManager, getAllLeaves);
router.get('/leave/myleaves', getLeaveById);
router.post('/leave/apply',createLeave);
router.patch('/leave/:id/approve',verifyAdminorManager, updateLeave);

export default router;
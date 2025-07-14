import express from 'express';
import {  getDepartmentById, createDepartment, updateDepartment, getAllDepartments } from '../Controller/department.controller.js';
import { verifyAdmin, verifyAdminorManager } from '../mildware/verify.token.js';
const router = express.Router();

router.get('/department', verifyAdminorManager, getAllDepartments);
router.get('/department/:id', verifyAdminorManager, getDepartmentById);
router.post('/department',verifyAdmin, createDepartment); 
router.put('/department/:id', verifyAdmin,updateDepartment);

export default router;

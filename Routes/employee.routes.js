
import express from 'express';
import { createEmployee,getEmployeeById, getAllEmployees, updateEmployeeById, deleteEmployeeById } from '../Controller/employee.controller.js';
import { get } from 'mongoose';
import { verifyaAll, verifyAdmin, verifyAdminorManager } from '../mildware/verify.token.js';


const router = express.Router();

router.get("/employee/:id",verifyaAll, getEmployeeById);
router.post("/employee",verifyAdmin, createEmployee);
router.get("/employee", verifyAdminorManager, getAllEmployees);
router.put("/employee/:id", verifyaAll,updateEmployeeById);
router.delete("/employee/:id", verifyAdmin,deleteEmployeeById);

export default router;
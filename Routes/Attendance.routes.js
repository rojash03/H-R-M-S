import express from "express";
import { get } from "mongoose";
import {
  getAllAttendance,
  getAttendanceById,
  createCheckIn,
  createCheckOut,
} from "../controller/attendance.controller.js";
import { verifyAdminorManager } from "../mildware/verify.token.js";
const router = express.Router();

router.get("/attendance", verifyAdminorManager, getAllAttendance);
router.get("/attendance/myAttendance", getAttendanceById);
router.post("/attendance/clockIn", createCheckIn);
router.post("/attendance/clockOut", createCheckOut);

export default router;

import express from "express";
import {Attendance} from "../Modles/attendance.js";
export const getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        res.status(200).json({
            message: "Attendance records fetched successfully",
            attendanceRecords,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const getAttendanceById = async (req, res) => {
    try {
        const attendanceId = req.params.id;
        const attendanceRecord = await Attendance.findById(attendanceId);
        if (!attendanceRecord) {
            return res.status(404).json({
                message: "Attendance record not found",
            });
        }
        res.status(200).json({
            message: "Attendance record fetched successfully",
            attendanceRecord,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const createCheckIn = async (req, res) => {
    try {
        const { employeeId, date, status } = req.body;
        if (!employeeId || !date || !status) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const newAttendance = new Attendance({ employeeId, date, status });
        await newAttendance.save();
        res.status(201).json({
            message: "Attendance record created successfully",
            attendanceRecord: newAttendance,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const createCheckOut = async (req, res) => {
    try {
        const { employeeId, date, status } = req.body;
        if (!employeeId || !date || !status) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const attendanceRecord = await Attendance.findOneAndUpdate(
            { employeeId, date },
            { status },
            { new: true }
        );
        if (!attendanceRecord) {
            return res.status(404).json({
                message: "Attendance record not found",
            });
        }  
        res.status(200).json({
            message: "Attendance record updated successfully",
            attendanceRecord,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
export const deleteAttendance = async (req, res) => {
    try {
        const attendanceId = req.params.id;
        const deletedAttendance = await Attendance.findByIdAndDelete(attendanceId);
        if (!deletedAttendance) {
            return res.status(404).json({
                message: "Attendance record not found",
            });
        }
        res.status(200).json({
            message: "Attendance record deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
import { leave } from "../Models/leaveRequest.js";
import { employee } from "../Models/employee.js";
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await leave.find();
    res.status(200).json({
      message: "Leaves fetched successfully",
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getLeaveById = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const leaveRecord = await leave.findById(leaveId);
    if (!leaveRecord) {
      return res.status(404).json({
        message: "Leave record not found",
      });
    }
    res.status(200).json({
      message: "Leave record fetched successfully",
      leaveRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const createLeave = async (req, res) => {
  try {
    const { employeeId, startdate, enddate, reason, leaveType} = req.body;

    if (!employeeId || !startdate || !enddate || !reason|| !leaveType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await employee.findById(employeeId);
    if (!exists) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const newLeave = new leave({ employeeId, startdate, enddate, reason, leaveType });
    await newLeave.save();

    res.status(201).json({
      message: "Leave record created successfully",
      leaveRecord: newLeave,
    });
  } catch (error) {
    console.error("Error creating leave:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { status } = req.body;
    const updatedLeave = await leave.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );
    if (!updatedLeave) {
      return res.status(404).json({
        message: "Leave record not found",
      });
    }
    res.status(200).json({
      message: "Leave record updated successfully",
      leaveRecord: updatedLeave,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

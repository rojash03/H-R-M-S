import e from 'express';
import {department} from '../Models/department.js';

export const getAllDepartments = async (req, res) => {
    try {
        const departments = await department.find();
        res.status(200).json({
            message: "Departments fetched successfully",
            departments,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const getDepartmentById = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const dept = await department.findOne({ _id: departmentId });
        if (!dept) {
            return res.status(404).json({
                message: "Department not found",
            });
        }
        res.status(200).json({
            message: "Department fetched successfully",
            department: dept,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }};

    export const createDepartment = async (req, res) => {
        try {
            const { name, description } = req.body;
            if (!name || !description) {
                return res.status(400).json({
                    message: "All fields are required",
                });
            }
            const newDepartment = new department({ name, description });
            await newDepartment.save();
            res.status(201).json({
                message: "Department created successfully",
                department: newDepartment,
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }

    export const updateDepartment = async (req, res) => {
        try {
            const departmentId = req.params.id;
            const { name, description } = req.body;
            if (!name || !description) {
                return res.status(400).json({
                    message: "All fields are required",
                });
            }
            const updatedDepartment = await department.findByIdAndUpdate(departmentId, { name, description }, { new: true });
            if (!updatedDepartment) {
                return res.status(404).json({
                    message: "Department not found",
                });
            }
            res.status(200).json({
                message: "Department updated successfully",
                department: updatedDepartment,
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
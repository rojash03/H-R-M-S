import {employee} from "../Modles/employee.js";

    export const getAllEmployees = async (req, res) =>{
        try{
            const employees = await employee.find();
            res.status(200).json({
                message: "Employees fetched successfully",
                employees,
            });
        } catch (error){
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }

        };

    export const getEmployeeById = async (req, res) => {
    try {
      const userId = req.params.id;
      const emp = await employee.findById(userId);
  
      if (!emp) {
        return res.status(404).json({
          message: "Employee not found",
        });
      }
  
      res.status(200).json({
        message: "Employee fetched successfully",
        employee: emp,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  export const createEmployee = async (req, res) => {
    try{
        const{
            userid,
            firstname,
            lastname,
            email,
            number,
            address,
            department,
            position,
            salary,
            dateOfBirth
        } = req.body;

    if (!userid || !firstname ||!lastname|| !email || !number || !address || !department || !position || !salary || !dateOfBirth) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    const alreadyExists = await employee.findOne({ email });
    if (alreadyExists) {
        return res.status(400).json({ message: "Employee with this email already exists" });
    }
    const newEmployee = new employee({
        userid, 
        firstname,
        lastname,
        email,
        number,
        address,
        department,
        position,
        salary,
        dateOfBirth
    })
    await newEmployee.save();
    const employeeReasponse = newEmployee.toObject();

    res.status(201).json({
        message: "Employee created successfully",
        employee: employeeReasponse,
    });
    }catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }};
export const updateEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updates = req.body;
        if (updates.password) {
            delete updates.password;
        }
        const employeeData = await employee.findByIdAndUpdate(employeeId, updates, {
            new: true,
        });
        if (!employeeData) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }
        res.status(200).json({
            message: "Employee updated successfully",
            employee: employeeData,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const deleteEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employeeData = await employee.findByIdAndDelete(employeeId);
        if (!employeeData) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }
        res.status(200).json({
            message: "Employee deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}


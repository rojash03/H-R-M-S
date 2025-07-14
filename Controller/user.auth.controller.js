import e from "express";
import { User } from "../Modles/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const regestirUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({
      email,
    }).select("+password");

    if (!userData) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const Check = bcrypt.compareSync(password, userData.password);

    if (!Check) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { password: pass, ...rest } = userData._doc;

    const token = jwt.sign(
      {
        id: rest._id,
        role: rest.role,
      },
      process.env.JWT
    );

    return res.status(200).json({ token, data: rest });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const passReset = async (req, res) => {
  try {
    const { email, password: newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password are required" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 8);

    const resetPass = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!resetPass) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Password reset successfully",
      user: resetPass,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
const Users = await User.find();

    res.status(200).json({
      message: "User data fetched successfully",
      Users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


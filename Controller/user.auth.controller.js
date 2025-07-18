import e from "express";
import { User } from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
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

 export const sendEmail = async (req, res) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'np05cp4a240283@iic.edu.np',
        pass: 'wbyh obwl xkce fovy'
      }
    });

    // Email options
    const mailOptions = {
      from: 'np05cp4a240283@iic.edu.np',
      to: 'thaparojash703@gmail.com',
      subject: 'Hi there! This is a test email',
      text: 'Hello! This is a test email sent using Nodemailer and Node.js.',
      html: `<p>We're happy to let you know that your message has been created successfully!
<br>
You can now view, edit, or share your message at any time by logging into your account.
<br>
If you have any questions or need assistance, feel free to reach out to our support team.</p>`
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
        return res.status(500).json({ message: "Error sending email", error: error.message });
      }
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: "Email sent successfully", info: info.response });
    });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
}
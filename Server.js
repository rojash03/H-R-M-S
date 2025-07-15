import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userAuthRoutes from './Routes/user.auth.router.js';
import attendanceRoutes from './Routes/Attendance.routes.js';
import departmentRoutes from './Routes/department.routes.js';
import employeeRoutes from './Routes/employee.routes.js';
import leaveRoutes from './Routes/leave.route.js';
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.use("/api", userAuthRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", departmentRoutes);
app.use("/api", employeeRoutes);
app.use("/api", leaveRoutes);


app.post('/send-email', async (req, res) => {
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
      to: 'kushalkattel025@gmail.com',
      subject: 'Test Email from Node.js',
      text: 'Hello! This is a test email sent using Nodemailer and Node.js.',
      html: '<p>Hello! This is a <b>test email</b> sent using <i>Nodemailer</i> and Node.js.</p>'
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error:', error);
      }
      console.log('Email sent:', info.response);
    });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

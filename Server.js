import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userAuthRoutes from './Routes/user.auth.router.js';
import attendanceRoutes from './Routes/Attendance.routes.js';
import departmentRoutes from './Routes/department.routes.js';
import employeeRoutes from './Routes/employee.routes.js';
import leaveRoutes from './Routes/leave.route.js';

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

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

import mongoose from "mongoose";
export const attendanceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true,
        ref: 'employee'
    },
    date: {
        type: Date,
        required: true
    },
    checkInTime: {
        type: Date,
        required: true
    },
    checkOutTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'leave'],
        default: 'present'
    },
    notes: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});
export const Attendance = mongoose.model('Attendance', attendanceSchema);
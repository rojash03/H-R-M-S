import e from "express";
import mangoose from "mongoose";
export const leaveRequestSchema = new mangoose.Schema({
    id:{
        type:mangoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
        unique: true
    },
    employeeId: {
        type: mangoose.Schema.Types.ObjectId,
        required: true,
        ref: 'employee'
    },
    leaveType: {
        type: String,
        required: true,
        enum: ['sick', 'vacation', 'personal']
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date, 
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedBy: {
        type:mangoose.Schema.Types.ObjectId,
        ref: 'employee',
        default: null

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
const leave = mangoose.model('LeaveRequest', leaveRequestSchema);
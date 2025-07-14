import {  mongoose } from "mongoose";
const departmentSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    managerid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'employee',
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

export const department = mongoose.model('Department', departmentSchema);
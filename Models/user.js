import e from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    role:{
        type: String,
        enum: ['user', 'admin', "manager"],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isTempPassword: {
        type: Boolean,
        default: false
    },
    isTempPasswordExpiry: {
        type: Date,
        default: null
    },
    requiredPasswordChange: {
        type: Boolean,
        default: false
    },
    lastlogin: {
        type: Date,
        default: Date.now
    },  
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true,
}
);
export const User = mongoose.model('User', userSchema);

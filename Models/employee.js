import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true,
        unique: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum:["male", "female"]
    },
    number: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, 'Phone number must be at least 10 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },  
    dateOfBirth: {
        type: Date,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    hireddate: {
        type: Date,
        default: Date.now
    },
    employeeType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract'],
        default: 'full-time'
    },
    leaveBalance: {
        annual: {
            type: Number,
            default: 0
        },
        sick: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

export const employee = mongoose.model('Employee', employeeSchema);
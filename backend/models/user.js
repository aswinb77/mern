const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"],
        unique: true,
        trim: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant'
    }],
    role: {
        type: String,
        enum: {
            values: ['buyer', 'merchant', 'admin'],
            message: '{VALUE} is not a valid role'
        },
        default: 'buyer'
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model("User", userSchema);
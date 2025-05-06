const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['latex', 'coagulant', 'rubber sheets', 'other'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"]
    },
    qualityScore: {
        type: Number,
        min: [0, "Score cannot be negative"],
        max: [100, "Score cannot exceed 100"]
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Refers to the merchant selling the product
        required: true
    },
    images: [{
        type: String  // Store image URLs
    }],
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);

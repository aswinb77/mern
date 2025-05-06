const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    merchant: {
        type: String,
        ref: 'Merchant',
        required: [true, "Merchant ID is required"]
    },
    orderId: {
        type: String,
        required: [true, "Order ID is required"],
        unique: true,
        trim: true
    },
    productId :{
        type : String,
        ref : 'Product ID',
        required: [true, "Merchant ID is required"]
    },
    productName: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    }
}, {
    timestamps: true // Disable automatic timestamps since we're using a custom timestamp field
});

module.exports = mongoose.model("Order", orderSchema);
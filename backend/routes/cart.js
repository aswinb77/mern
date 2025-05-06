const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order"); 
const { authenticateToken } = require("./userAuth");
const Product  = require("../models/Product");

//put product to cart
router.post("/add-order", authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id; // Normalized to _id from authenticateToken
        const { merchant, productName, orderId, timestamp } = req.body;

        const newOrder = new Order({
            merchant,
            orderId,        // Manually provided orderId
            timestamp,      // Manually provided timestamp
            productName,    // Directly use the provided productName
            status: "pending" // Default status from schema
        });

        await newOrder.save();

        res.status(201).json({
            mssg: "Order created successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});

//get all
router.get("/get-all", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate("merchant", "name").sort({ createdAt: -1 });

        res.status(200).json({ orders });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});

//get detials
router.get("/get-order/:id", authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("merchant", "name");

        if (!order) {
            return res.status(200).json({ order: null });
        }

        res.status(200).json({ order });

    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});

//update
router.put("/update-order/:id", authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status, paymentStatus } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ mssg: "Order not found" });
        }

        if (status) order.status = status;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();

        res.status(200).json({ mssg: "Order updated successfully", order });

    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});

//delete
router.delete("/delete-order/:id", authenticateToken, async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ mssg: "Order not found" });
        }

        await Order.deleteOne({ _id: orderId });

        res.status(200).json({ mssg: "Order deleted successfully" });

    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
const express = require("express");
const { authenticateToken } = require("./userAuth");
const User = require("../models/User");
const Product = require("../models/Product"); 
const router = express.Router();

// Add Product Route -- Only for Merchants
router.post("/add-prod", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers["id"];  
        const user = await User.findById(userId);

        if (user.role !== "merchant") {
            return res.status(403).json({ mssg: "Only merchants can add products" });
        }

        const { name, description, category, price, stock, qualityScore, images } = req.body;

        if (!name || !category || !price || !stock) {
            return res.status(400).json({ mssg: "Name, category, price, and stock are required" });
        }

        const validCategories = ['latex', 'coagulant', 'rubber sheets', 'other'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ mssg: "Invalid category" });
        }

        if (qualityScore && (typeof qualityScore !== 'number' || qualityScore < 0 || qualityScore > 100)) {
            return res.status(400).json({ mssg: "Quality score must be a number between 0 and 100" });
        }

        // 🔥 Check if the product already exists for the same merchant
        const existingProduct = await Product.findOne({ name, merchant: userId });
        if (existingProduct) {
            return res.status(409).json({ mssg: "Product with the same name already exists" });
        }

        const newProduct = new Product({
            name,
            description,
            category,
            price,
            stock,
            qualityScore,
            images,
            merchant: userId
        });

        await newProduct.save();

        res.status(201).json({
            mssg: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ mssg: "Internal Server Error" });
    }
});


//edit product 
router.put("/edit-prod/:id", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers["id"];  
        const productId = req.params.id;

        if (!userId || !productId) {
            return res.status(400).json({ mssg: "User ID and Product ID are required" });
        }

        const user = await User.findById(userId);
        if (!user || user.role !== "merchant") {
            return res.status(403).json({ mssg: "Only merchants can edit products" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ mssg: "Product not found" });
        }

        if (product.merchant.toString() !== userId) {
            return res.status(403).json({ mssg: "You can only edit your own products" });
        }

        const { name, description, category, price, stock, qualityScore, images } = req.body;

        if (name) product.name = name;
        if (description) product.description = description;
        if (category) {
            const validCategories = ['latex', 'coagulant', 'rubber sheets', 'other'];
            if (!validCategories.includes(category)) {
                return res.status(400).json({ mssg: "Invalid category" });
            }
            product.category = category;
        }
        if (price !== undefined) {
            if (price < 0) {
                return res.status(400).json({ mssg: "Price cannot be negative" });
            }
            product.price = price;
        }
        if (stock !== undefined) {
            if (stock < 0) {
                return res.status(400).json({ mssg: "Stock cannot be negative" });
            }
            product.stock = stock;
        }
        if (qualityScore !== undefined) {
            if (qualityScore < 0 || qualityScore > 100) {
                return res.status(400).json({ mssg: "Quality score must be between 0 and 100" });
            }
            product.qualityScore = qualityScore;
        }
        if (images) product.images = images;

        await product.save();

        res.status(200).json({
            mssg: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error("Error editing product:", error.message, error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});

// Delete Product Route -- Only for Merchants
router.delete("/delete-prod/:id", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers["id"];  
        const productId = req.params.id;

        if (!userId || !productId) {
            return res.status(400).json({ mssg: "User ID and Product ID are required" });
        }

        const user = await User.findById(userId);
        if (!user || user.role !== "merchant") {
            return res.status(403).json({ mssg: "Only merchants can delete products" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ mssg: "Product not found" });
        }

        // Ensure only the product owner can delete it
        if (product.merchant.toString() !== userId) {
            return res.status(403).json({ mssg: "You can only delete your own products" });
        }

        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            mssg: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting product:", error.message, error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});

//get all products
router.get("/get-products", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  
        const limit = parseInt(req.query.limit) || 10;  
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .populate("merchant", "username email")  // Include merchant info
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({
            mssg: "Products retrieved successfully",
            page,
            totalPages,
            totalProducts,
            products
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});


// Add this new route in your backend
router.get("/get-products-by-merchant/:merchantId", async (req, res) => {
    try {
        const { merchantId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find({ merchant: merchantId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalProducts = await Product.countDocuments({ merchant: merchantId });
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({
            mssg: "Merchant products retrieved successfully",
            page,
            totalPages,
            totalProducts,
            products
        });

    } catch (error) {
        console.error("Error fetching merchant products:", error);
        res.status(500).json({ mssg: "Internal Server Error", error: error.message });
    }
});


module.exports = router;

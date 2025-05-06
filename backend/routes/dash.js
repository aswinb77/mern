const express = require("express");
const Pdf = require("../models/Pdf");
const { authenticateToken } = require("./userAuth");
const router = express.Router();

// Get All PDFs Uploaded by the Current User
router.get("/user-pdfs", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;  
        
        const pdfs = await Pdf.find({ uploadedBy: userId });

        if (pdfs.length === 0) {
            return res.status(404).json({ mssg: "No PDFs found" });
        }

        res.status(200).json({
            mssg: "PDFs fetched successfully",
            pdfs
        });

    } catch (error) {
        console.error("Error fetching PDFs:", error);
        res.status(500).json({ mssg: "Internal Server Error" });
    }
});

module.exports = router;

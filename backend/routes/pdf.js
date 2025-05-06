const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const Pdf = require("../models/Pdf");
const { authenticateToken } = require("./userAuth");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"), false);
        }
    }
});

// Enhanced PDF processing route
router.post("/upload-pdf", authenticateToken, upload.single("pdf"), async (req, res) => {
    try {
        // Validate required fields
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No PDF file uploaded" 
            });
        }

        if (!req.body.username) {
            fs.unlinkSync(req.file.path); // Clean up file
            return res.status(400).json({ 
                success: false, 
                message: "Username is required" 
            });
        }

        // Process PDF content
        const dataBuffer = fs.readFileSync(req.file.path);
        const { text: content } = await pdfParse(dataBuffer);

        // Enhanced parameter extraction with multiple pattern matching
        const latexPercentage = extractParameter(content, [
            /Latex Percentage[:\s]*([0-9.]+)%?/i,
            /Latex[:\s]*([0-9.]+)%?/i
        ]);
        
        const dryRubberContent = extractParameter(content, [
            /Dry Rubber Content[:\s]*([0-9.]+)%?/i,
            /Dry Rubber[:\s]*([0-9.]+)%?/i,
            /DRC[:\s]*([0-9.]+)%?/i
        ]);

        const qualityScore = extractParameter(content, [
            /Quality Score[:\s]*([0-9.]+)/i,
            /QS[:\s]*([0-9.]+)/i
        ]);

        // Determine quality status based on score
        const qualityStatus = determineQualityStatus(qualityScore);
        
        // Calculate suggested price based on parameters
        const suggestedPrice = calculateSuggestedPrice(latexPercentage, dryRubberContent, qualityScore);

        // Create PDF document according to schema
        const pdfDoc = new Pdf({
            sampleId: extractField(content, [
                /Sample ID[:\s]*([^\n]+)/i,
                /Sample[:\s]*([^\n]+)/i,
                /ID[:\s]*([^\n]+)/i
            ], "UNKNOWN_ID"),
            name: req.file.originalname,
            fileUrl: req.file.path,
            parameters: {
                latexPercentage: latexPercentage,
                dryRubberContent: dryRubberContent,
                qualityScore: qualityScore
            },
            qualityStatus: qualityStatus,
            suggestedPrice: suggestedPrice,
            testedBy: extractField(content, [
                /Tested By[:\s]*([^\n]+)/i,
                /Laboratory[:\s]*([^\n]+)/i
            ], "Unknown Lab"),
            dateReceived: extractDate(content, [
                /Date Received[:\s]*([0-9\-/]+)/i,
                /Received[:\s]*([0-9\-/]+)/i
            ]),
            username: req.body.username
        });

        // Save to database
        await pdfDoc.save();

        // Respond with success
        res.status(201).json({
            success: true,
            message: "PDF processed successfully",
            data: {
                id: pdfDoc._id,
                sampleId: pdfDoc.sampleId,
                parameters: pdfDoc.parameters,
                qualityStatus: pdfDoc.qualityStatus,
                suggestedPrice: pdfDoc.suggestedPrice,
                testedBy: pdfDoc.testedBy,
                dateReceived: pdfDoc.dateReceived
            }
        });

    } catch (error) {
        // Error handling
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.error("PDF Processing Error:", error);
        res.status(500).json({
            success: false,
            message: "PDF processing failed",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

  //get the last
  router.get('/get-latest-pdf', async (req, res) => {
    try {
        const { username } = req.query;
        console.log("Received username:", username);

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const totalCount = await Pdf.countDocuments({ username });
        
        // Only try to find the latest PDF if there are any
        let latestPdf = null;
        if (totalCount > 0) {
            latestPdf = await Pdf.findOne({ username })
                .sort({ createdAt: -1 })
                .select('parameters suggestedPrice createdAt')
                .lean();
        }

        res.status(200).json({
            success: true,
            pdf: latestPdf, // will be null if no PDFs exist
            totalCount: totalCount,
            hasPdf: totalCount > 0
        });
    } catch (error) {
        console.error('Error fetching latest PDF:', error.message, error.stack);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});



// Helper functions
function extractField(text, patterns, defaultValue = "") {
    if (!Array.isArray(patterns)) patterns = [patterns];
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) return match[1].trim();
    }
    return defaultValue;
}

function extractParameter(text, patterns) {
    const value = parseFloat(extractField(text, patterns, "0"));
    return Math.min(Math.max(value, 0), 100); // Clamp to 0-100 range
}

function extractDate(text, patterns) {
    const dateStr = extractField(text, patterns);
    if (!dateStr) return new Date();
    
    // Try different date formats
    const formats = [
        /\d{4}-\d{2}-\d{2}/,  // YYYY-MM-DD
        /\d{2}-\d{2}-\d{4}/,  // DD-MM-YYYY
        /\d{2}\/\d{2}\/\d{4}/ // DD/MM/YYYY
    ];
    
    for (const format of formats) {
        if (format.test(dateStr)) {
            return new Date(dateStr);
        }
    }
    
    return new Date(); // Fallback to current date
}

function determineQualityStatus(score) {
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Bad";
}

function calculateSuggestedPrice(latexPercent, dryRubberPercent, qualityScore) {
    // Base price calculation (adjust these factors as needed)
    const latexFactor = 0.6;  // Latex contributes 60% to value
    const rubberFactor = 0.4; // Dry rubber contributes 40%
    
    // Quality multipliers
    const qualityMultipliers = {
        'Good': 1.2,
        'Average': 1.0,
        'Bad': 0.8
    };
    
    // Calculate base price per 100kg (₹100-₹500 range)
    const basePricePerKg = 3.5; // ₹3.5 per kg base rate
    const qualityStatus = determineQualityStatus(qualityScore);
    const qualityMultiplier = qualityMultipliers[qualityStatus] || 1.0;
    
    const weightedQuality = (latexPercent * latexFactor) + (dryRubberPercent * rubberFactor);
    const price = basePricePerKg * weightedQuality * qualityMultiplier * 100; // Convert to 100kg
    
    return `₹${Math.round(price).toLocaleString('en-IN')} per 100 kg`;
}

module.exports = router;
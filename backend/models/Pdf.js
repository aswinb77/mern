const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    sampleId: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    fileUrl: { 
        type: String, 
        required: true 
    },
    parameters: {
        latexPercentage: { 
            type: Number, 
            min: 0, 
            max: 100, 
            required: true
        },
        dryRubberContent: { 
            type: Number, 
            min: 0, 
            max: 100, 
            required: true
        },
        qualityScore: { 
            type: Number, 
            min: 0, 
            max: 100, 
            required: true
        }
    },
    qualityStatus: {
        type: String,
        enum: ['Good', 'Average', 'Bad'],
        required: true
    },
    suggestedPrice: { 
        type: String,   // Price in ₹1500 per 100 kg format
        required: true 
    },
    testedBy: {
        type: String,
        required: true
    },
    dateReceived: { 
        type: Date, 
        required: true 
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Pdf", pdfSchema);
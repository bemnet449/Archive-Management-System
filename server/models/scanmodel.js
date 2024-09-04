const mongoose = require('mongoose');

const scanFileSchema = new mongoose.Schema({
    volumenumber: {
        type: Number,
        required: true,
    },
    documenttype: {
        type: String,
        enum: ['type1', 'type2'], // Ensure these values match what is used in the frontend
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    keywords: {
        type: String,
        required: true,
    },
    addinfo: {
        type: String,
        required: true,
    },
});

const Scanned = mongoose.model("Scans", scanFileSchema);

module.exports = Scanned;

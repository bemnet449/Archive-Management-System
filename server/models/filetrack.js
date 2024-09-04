const mongoose = require('mongoose');

const fileMovementSchema = new mongoose.Schema({
    fileNumber: {
        type: String,
        required: true
    },
    organizationName: {
        type: String,
        required: true
    },
    volumeNumber: {
        type: Number,
        required: true
    },
    requestor: {
        name: {
            type: String,
            required: true
        },
        fatherName: {
            type: String
        },
        grandfatherName: {
            type: String
        }
    },
    receiver: {
        name: {
            type: String,
            required: true
        },
        fatherName: {
            type: String
        },
        grandfatherName: {
            type: String
        }
    },
    borrowingDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    pagesWhenBorrowed: {
        type: Number,
        required: true
    },
    pagesWhenReturned: {
        type: Number,
        default: 0,
    },
    remarks: {
        type: String
    },
    approvalReason: { 
        type: String, default: null
    } 
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const FileMovements = mongoose.model('FileMovements', fileMovementSchema);

module.exports = FileMovements;
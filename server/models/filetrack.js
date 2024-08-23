const mongoose = require('mongoose');

const fileMovementSchema = new mongoose.Schema({
    fileNumber: {
        type: String,
        required: true,
        unique: true
    },
    organizationName: {
        type: String,
        required: true
    },
    volumeNumber: {
        type: Number,
        required: true
    },
    requester: {
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
        type: Number
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const FileMovement = mongoose.model('FileMovement', fileMovementSchema);

module.exports = FileMovement;
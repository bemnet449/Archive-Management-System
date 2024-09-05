const express = require('express');
const Letter = require('../models/letters.js');

const router = express.Router();

router.post("/save", async (req, res) => {
    try {
        const formData = {
            fileNumber: req.body.fileNumber,
            volumeNumber: req.body.volumeNumber,
            nameOfOrg: req.body.nameOfOrg,
            correspondenceType: req.body.correspondenceType,
            receiverSender: {
                name: req.body.receiverSenderName,
                fatherName: req.body.receiverSenderFatherName,
                grandfatherName: req.body.receiverSenderGrandfatherName
            },
            archiveEmployee: {
                name: req.body.archiveEmployeeName,
                fatherName: req.body.archiveEmployeeFatherName,
                grandfatherName: req.body.archiveEmployeeGrandfatherName
            },
            title: req.body.title,
            letterNumber: req.body.letterNumber,
            attachmentNumber: req.body.attachmentNumber,
            className: req.body.className,
            caseType: req.body.caseType,
            language: req.body.language,
            urgencyLevel: req.body.urgencyLevel,
            contentOfLetter: req.body.contentOfLetter,
            writtenDate: req.body.writtenDate,
            entryDate: req.body.entryDate,
            time: req.body.time,
            wayOfDelivery: req.body.wayOfDelivery,
            reviews: req.body.reviews,
        };

        const letter = new Letter(formData);
        await letter.save();

        res.status(201).json({ message: 'success' });
    } catch (error) {
        console.error('Error saving letter:', error);
        res.status(500).json({ message: 'Error saving letter', error });
    }
});

// Search1 Endpoint
router.post("/search1", async (req, res) => {
    try {
        const { fileNumber } = req.body;
        const fileData = await Letter.find({ fileNumber: parseInt(fileNumber) });

        if (fileData.length > 0) {
            res.status(200).json({
                message: "success",
                data: fileData.map(item => ({
                    _id: item._id,
                    title: item.title,
                    caseType: item.caseType,
                    letterNumber: item.letterNumber,
                    nameOfOrg: item.nameOfOrg,
                    employee: item.decisionDetails.map(detail => detail.employee).join(', '),
                    decision: item.decisionDetails.map(detail => detail.decision).join(', '),
                    decisionDate: item.decisionDetails.map(detail => detail.decisionDate).join(', '),
                    decisionDescription: item.decisionDetails.map(detail => detail.decisionDescription).join(', '),
                    remark: item.decisionDetails.map(detail => detail.remark).join(', '),
                })),
            });
        } else {
            res.status(404).json({ message: 'No records found' });
        }
    } catch (error) {
        console.error('Error searching for Letter:', error);
        res.status(500).json({ message: 'Error searching for Letter', error });
    }
});


router.post("/search2", async (req, res) => {
    try {
        const { nameOfOrg } = req.body;
        // Case-insensitive regex search
        const fileData = await Letter.find({
            nameOfOrg: new RegExp(nameOfOrg, 'i') // 'i' flag for case-insensitive search
        });

        if (fileData.length > 0) {
            res.status(200).json({
                message: "success",
                data: fileData.map(item => ({
                    _id: item._id,
                    nameOfOrg: item.nameOfOrg,
                })),
            });
        } else {
            res.status(404).json({ message: 'No records found' });
        }
    } catch (error) {
        console.error('Error searching for Letter:', error);
        res.status(500).json({ message: 'Error searching for Letter', error });
    }
});

router.delete('/Ldelete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Validate the ID format
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        // Find and delete the case by ID
        const result = await Letter.findByIdAndDelete(id);

        if (result) {
            res.status(200).json({ message: 'success' });
        } else {
            res.status(404).json({ message: 'Case not found' });
        }
    } catch (error) {
        console.error("Error deleting case:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.post('/sendLetter', async (req, res) => {
    const { employee, decisionDate, decision, decisionDescription, remark } = req.body;

    try {
        // Create a new letter document
        const newLetter = new Letter({
            decisionDetails: [{
                employee,
                decisionDate,
                decision,
                decisionDescription,
                remark
            }]
        });

        await newLetter.save();
        res.status(200).json({ message: 'success' });
    } catch (error) {
        console.error("Error saving letter:", error);
        res.status(500).json({ message: 'error', error: error.message });
    }
});

router.post('/sendLetter/:id', async (req, res) => {
    const { id } = req.params; // Extract ID from URL parameters
    const { employee, decisionDate, decision, decisionDescription, remark } = req.body; // Extract data from request body

    try {
        // Find the letter by ID and update it
        const updatedLetter = await Letter.findByIdAndUpdate(
            id, // ID of the document to update
            {
                $push: {
                    decisionDetails: { // Add new decision detail to the array
                        employee,
                        decisionDate,
                        decision,
                        decisionDescription,
                        remark
                    }
                }
            },
            { new: true, useFindAndModify: false } // Return the updated document and avoid deprecated warnings
        );

        if (!updatedLetter) {
            return res.status(404).json({ message: 'Letter not found' });
        }

        res.json({ message: 'Letter updated successfully', data: updatedLetter });
    } catch (error) {
        console.error('Error updating letter:', error);
        res.status(500).json({ message: 'Error updating letter' });
    }
});



module.exports = router;

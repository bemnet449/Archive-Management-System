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
                    title: item.title,
                    caseType: item.caseType,
                    letterNumber: item.letterNumber,
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
                    id: item._id,
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



module.exports = router;

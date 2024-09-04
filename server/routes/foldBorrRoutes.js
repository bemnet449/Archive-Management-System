const express = require('express');
const FileMovement= require('../models/filetrack');

const router = express.Router();

// saving the borrowed file

router.post('/Arv', async (req, res) => {
    try {
        const {
            fileNumber,
            organizationName,
            volumeNumber,
            requesterName,
            requesterFatherName,
            requesterGrandfatherName,
            receiverName,
            receiverFatherName,
            receiverGrandfatherName,
            borrowingDate,
            returnDate,
            pagesWhenBorrowed,
            pagesWhenReturned,
            remarks
        } = req.body;

        const newFileMovement = new FileMovement({
            fileNumber,
            organizationName,
            volumeNumber,
            requestor: {
                name: requesterName,
                fatherName: requesterFatherName,
                grandfatherName: requesterGrandfatherName,
            },
            receiver: {
                name: receiverName,
                fatherName: receiverFatherName,
                grandfatherName: receiverGrandfatherName,
            },
            borrowingDate,
            returnDate,
            pagesWhenBorrowed,
            pagesWhenReturned,
            remarks
        });

        await newFileMovement.save();

        res.status(201).json({ message: 'success' });
    } catch (error) {
        console.error('Error saving file details:', error);
        res.status(500).json({ message: 'Error saving file details', error });
    }
});

//search by names

router.post('/searchFileMovements', async (req, res) => {
    try {
        const { name, fatherName, grandfatherName, isRequester } = req.body;

        let query = {};

        if (isRequester) {
            query = {
                'requestor.name': name,
                ...(fatherName && { 'requestor.fatherName': fatherName }),
                ...(grandfatherName && { 'requestor.grandfatherName': grandfatherName })
            };
        } else {
            query = {
                'receiver.name': name,
                ...(fatherName && { 'receiver.fatherName': fatherName }),
                ...(grandfatherName && { 'receiver.grandfatherName': grandfatherName })
            };
        }

        const fileMovements = await FileMovement.find(query);

        if (fileMovements.length > 0) {
            res.status(200).json({
                message: 'success',
                data: fileMovements.map(fm => ({
                    _id: fm._id,  // Ensure _id is included
                    requesterName: fm.requestor.name,
                    requesterFatherName: fm.requestor.fatherName,
                    requesterGrandfatherName: fm.requestor.grandfatherName,
                    receiverName: fm.receiver.name,
                    receiverFatherName: fm.receiver.fatherName,
                    receiverGrandfatherName: fm.receiver.grandfatherName,
                    organizationName: fm.organizationName,
                }))
            });
        } else {
            res.status(404).json({ message: 'No records found' });
        }
    } catch (error) {
        console.error('Error searching for file movements:', error);
        res.status(500).json({ message: 'Error searching for file movements', error });
    }
});


//search by file number

router.post('/search-file', async (req, res) => {
    try {
        const { fileNumber } = req.body;
        const fileMovements = await FileMovement.find({ fileNumber });

        if (fileMovements.length > 0) {
            res.status(200).json({
                message: 'success',
                data: fileMovements.map(fm => ({
                    _id: fm._id,
                    fileNumber: fm.fileNumber,
                    organizationName: fm.organizationName,
                    volumeNumber: fm.volumeNumber,
                    requestorName: fm.requestor && fm.requestor.name ? fm.requestor.name : 'Unknown',
                    requestorFatherName: fm.requestor && fm.requestor.fatherName ? fm.requestor.fatherName : 'Unknown',
                    requestorGrandfatherName: fm.requestor && fm.requestor.grandfatherName ? fm.requestor.grandfatherName : 'Unknown',
                    receiverName: fm.receiver && fm.receiver.name ? fm.receiver.name : 'Unknown',
                    receiverFatherName: fm.receiver && fm.receiver.fatherName ? fm.receiver.fatherName : 'Unknown',
                    receiverGrandfatherName: fm.receiver && fm.receiver.grandfatherName ? fm.receiver.grandfatherName : 'Unknown',
                    pagesWhenBorrowed: fm.pagesWhenBorrowed,
                    borrowingDate: fm.borrowingDate,
                    pagesWhenReturned: fm.pagesWhenReturned,
                    returnDate: fm.returnDate,
                    remarks: fm.remarks,
                    approvalReason: fm.approvalReason || '', // Include approval reason in the response
                }))
            });
        } else {
            res.status(404).json({ message: 'No records found' });
        }
    } catch (error) {
        console.error('Error searching for file movements:', error);
        res.status(500).json({ message: 'Error searching for file movements', error });
    }
});
//deleting borrowed file

router.delete('/file-movements/delete/:Id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await FileMovement.findOneAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'File movement not found.' });
        }
        res.status(200).json({ message: 'File movement deleted successfully.' });
    } catch (error) {
        console.error('Error deleting file movement:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// fetching for the returning data

// Fetch file movement details by ID
router.get('/file-movements/:Id', async (req, res) => {
    try {
        // Use req.params.fmId to access the ID
        const fileMovement = await FileMovement.findById(req.params.Id);
        if (!fileMovement) {
            return res.status(404).json({ message: 'File movement not found' });
        }
        res.json(fileMovement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update file movement with return details
router.put('/file-movements/return/:Id', async (req, res) => {
    try {
        const { returnDate, pagesWhenReturned, approvalReason } = req.body;
        // Use req.params.fmId to access the ID
        const fileMovement = await FileMovement.findById(req.params.Id);
        if (!fileMovement) {
            return res.status(404).json({ message: 'File movement not found' });
        }

        fileMovement.returnDate = returnDate;
        fileMovement.pagesWhenReturned = pagesWhenReturned;
        fileMovement.approvalReason = approvalReason;

        await fileMovement.save();
        res.json(fileMovement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
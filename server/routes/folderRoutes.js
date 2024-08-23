const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/model'); // Adjust the path as needed

const router = express.Router();

// Get folder details by user ID
router.get('/users/:userId/folders', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ folderDetails: user.folderDetails });
    } catch (error) {
        console.error('Error fetching folder details:', error);
        res.status(500).json({ message: 'An error occurred while fetching folder details' });
    }
});

// Delete folder from user's list
router.delete('/users/:userId/folders/:folderId', async (req, res) => {
    const { userId, folderId } = req.params;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { folderDetails: { _id: folderId } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User or folder not found.' });
        }

        res.status(200).json({ message: 'Folder deleted successfully' });
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).json({ message: 'Failed to delete folder.' });
    }
});

// Get folder by ID
router.get('/folder/:folderId', async (req, res) => {
    try {
        const folderId = req.params.folderId;
        if (!mongoose.Types.ObjectId.isValid(folderId)) {
            return res.status(400).json({ message: 'Invalid Folder ID' });
        }

        const user = await User.findOne({ 'folderDetails._id': folderId });

        if (!user) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        const folder = user.folderDetails.id(folderId);

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        res.json(folder);
    } catch (error) {
        console.error('Error fetching folder details:', error);
        res.status(500).json({ message: 'Failed to fetch folder details.' });
    }
});

// Update folder by ID
router.put('/folders/:folderId', async (req, res) => {
    const {
        roomNumber,
        shelfNumber,
        lateralNumber,
        volumeNumber,
        fileCabinetNumber,
        dateOpened,
        dateClosed,
        remark
    } = req.body;

    try {
        const folderId = req.params.folderId;
        if (!mongoose.Types.ObjectId.isValid(folderId)) {
            return res.status(400).json({ message: 'Invalid Folder ID' });
        }

        // Find the user containing the folder to update
        const user = await User.findOne({ 'folderDetails._id': folderId });

        if (!user) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        // Get the specific folder and update its fields
        const folder = user.folderDetails.id(folderId);
        if (folder) {
            folder.roomNumber = roomNumber;
            folder.shelfNumber = shelfNumber;
            folder.lateralNumber = lateralNumber;
            folder.volumeNumber = volumeNumber;
            folder.fileCabinetNumber = fileCabinetNumber;
            folder.dateOpened = dateOpened;
            folder.dateClosed = dateClosed;
            folder.remark = remark;

            await user.save();

            res.json({ message: 'Folder updated successfully', folder });
        } else {
            res.status(404).json({ message: 'Folder not found' });
        }
    } catch (err) {
        console.error('Error updating folder:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

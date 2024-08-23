const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/model'); // Adjust the path as needed

const router = express.Router();

// Save folder details
router.post('/foldersave', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ status: 'success', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Add folder details to user
router.post('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { folderDetails } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ status: 'error', message: 'Invalid user ID format' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        user.folderDetails.push(...folderDetails);
        await user.save();

        res.status(200).json({ status: 'success', message: 'Folder details added successfully' });
    } catch (error) {
        console.error('Error saving folder details:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

// Get user by ID
router.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ name: user.name });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Search by name, fatherName, and grandfatherName
router.post('/search2', async (req, res) => {
    const { name, fatherName, grandfatherName } = req.body;

    try {
        const user = await User.findOne({ name, fatherName, grandfatherName });

        if (user) {
            res.json({ status: "success", userId: user._id });
        } else {
            res.json({ status: "fail", message: "No matching record found." });
        }
    } catch (error) {
        console.error("Error occurred during search:", error);
        res.status(500).json({ status: "error", message: "An error occurred while searching." });
    }
});

// Search by folderNumber
router.post('/search', async (req, res) => {
    const { folderNumber } = req.body;

    try {
        const users = await User.find({ folderNumber });

        if (users.length > 0) {
            res.json({ status: "success", users });
        } else {
            res.json({ status: "fail", message: "No users found with this folder number." });
        }
    } catch (error) {
        console.error("Error occurred during search:", error);
        res.status(500).json({ status: "error", message: "An error occurred while searching." });
    }
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin'); // Adjust the path as needed

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const admin = await Admin.create({ username, email, password: hashedPassword });
        res.json({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password.' });
        }

        const user = await Admin.findOne({ email });

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.json({ status: 'success' });
            } else {
                res.status(401).json({ status: 'error', message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ status: 'error', message: 'No record found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'An error occurred during login.' });
    }
});

module.exports = router;

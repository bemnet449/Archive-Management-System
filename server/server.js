const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/model'); // Adjust the path
const Admin = require('./models/admin');

const app = express();
const dburi = 'mongodb://localhost:27017/Archive';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(dburi)
    .then(() => {
        console.log('Connected to DB');
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


// Signup route
app.post('/signup', async (req, res) => {
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
app.post('/login', async (req, res) => {
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


// Save folder details
app.post('/foldersave', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ status: 'success', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});


// Add folder details to user
app.post('/users/:userId', async (req, res) => {
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
app.get('/users/:userId', async (req, res) => {
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


// Get folder details by user ID
app.get('/users/:userId/folders', async (req, res) => {
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


// Search by name, fatherName, and grandfatherName
app.post('/search2', async (req, res) => {
    const { name, fatherName, grandfatherName } = req.body;

    try {
        const user = await User.findOne({ name, fatherName, grandfatherName });

        if (user) {
            res.json({ status: "success", id: user._id });
        } else {
            res.json({ status: "fail", message: "No matching record found." });
        }
    } catch (error) {
        console.error("Error occurred during search:", error);
        res.status(500).json({ status: "error", message: "An error occurred while searching." });
    }
});


// Search by folderNumber
app.post('/search', async (req, res) => {
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


//Deleting user's folderdetails
app.delete('/users/:userId/folders/:folderId', async (req, res) => {
    const { userId, folderId } = req.params;
    console.log(`Deleting folder with ID ${folderId} from user with ID ${userId}`); // Log IDs

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { folderDetails: { _id: folderId } } },
            { new: true }
        );

        if (!user) {
            console.log('User or folder not found.'); 
            return res.status(404).json({ message: 'User or folder not found.' });
        }

        console.log('Folder deleted successfully.'); 
        res.status(200).json({ message: 'success' }); 
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).json({ message: 'Failed to delete folder.' });
    }
});


//get folderDetails by Id
app.get('/folder/:folderId', async (req, res) => {
    try {
        const folderId = req.params.folderId;
        if (!mongoose.Types.ObjectId.isValid(folderId)) {
            return res.status(400).json({ message: 'Invalid Folder ID' });
        }

        // Find the user that contains the folder with the given ID
        const user = await User.findOne({ 'folderDetails._id': folderId });

        if (!user) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        // Extract the specific folder details
        const folder = user.folderDetails.id(folderId);

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        res.json(folder);
    } catch (err) {
        console.error('Error fetching folder details:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


//Editing the folder details
app.put('/folder/:folderId', async (req, res) => {
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

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const folderRoutes = require('./routes/folderRoutes');
const FileMovement= require('./models/filetrack')

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

app.use(authRoutes);
app.use(usersRoutes);
app.use(folderRoutes);

app.post('/Arv', async (req, res) => {
    try {
        const {
            fileNumber,
            folderId,
            organizationName,
            volumeNumber,
            requestorName,
            requestorFatherName,
            requestorGrandfatherName,
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
            folderId,
            organizationName,
            volumeNumber,
            requester: {
                name: requestorName,
                fatherName: requestorFatherName,
                grandfatherName: requestorGrandfatherName,
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
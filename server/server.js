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

app.post('/searchFileMovements', async (req, res) => {
    try {
        const { name, fatherName, grandfatherName, isRequestor } = req.body;

        let query = {};
        
        if (isRequestor) {
            query = {
                'requester.name': name,
                'requester.fatherName': { $exists: true, $eq: fatherName },
                'requester.grandfatherName': { $exists: true, $eq: grandfatherName }
            };
        } else {
            query = {
                'receiver.name': name,
                'receiver.fatherName': { $exists: true, $eq: fatherName },
                'receiver.grandfatherName': { $exists: true, $eq: grandfatherName }
            };
        }

        const fileMovements = await FileMovement.find(query);

        if (fileMovements.length > 0) {
            res.status(200).json({
                message: 'success',
                data: fileMovements.map(fm => ({
                    requesterName: fm.requester.name,
                    receiverName: fm.receiver.name,
                    organizationName: fm.organizationName,
                    requesterFatherName: fm.requester.fatherName,
                    requesterGrandfatherName: fm.requester.grandfatherName,
                    receiverFatherName: fm.receiver.fatherName,
                    receiverGrandfatherName: fm.receiver.grandfatherName
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

app.post('/search-file', async (req, res) => {
    try {
        const { fileNumber } = req.body;
        const fileMovements = await FileMovement.find({ fileNumber });

        if (fileMovements.length > 0) {
            res.status(200).json({
                message: 'success',
                data: fileMovements.map(fm => ({
                    fileNumber: fm.fileNumber,
                    senderName: fm.sender && fm.sender.name ? fm.sender.name : 'Unknown',
                    receiverName: fm.receiver && fm.receiver.name ? fm.receiver.name : 'Unknown',
                    borrowingDate: fm.borrowingDate,
                    returnDate: fm.returnDate,
                    remarks: fm.remarks,
                    organizationName: fm.organizationName,
                    volumeNumber: fm.volumeNumber,
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

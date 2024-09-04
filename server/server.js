const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const folderRoutes = require('./routes/folderRoutes');
const foldBorrRoutes = require('./routes/foldBorrRoutes');
const lettersRoutes = require('./routes/lettersRoutes');
const scanRoutes = require('./routes/scanRoutes');
const Case = require("./models/lookup/case")
const Decision = require("./models/lookup/decision")
const Room = require('./models/lookup/roomnum');
const Shelf = require('./models/lookup/shelfnum');


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
app.use(foldBorrRoutes);
app.use(lettersRoutes);
app.use(scanRoutes);

/////////////////////////////////////////////

app.post('/Csave', async (req, res) => {
    const { data } = req.body;

    try {
        // Save the new case
        const newCase = new Case(data);
        await newCase.save();

        // Retrieve all saved cases
        const allCases = await Case.find();

        // Return success message along with all cases
        res.status(200).json({ message: 'success', cases: allCases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
});

app.delete('/Cdelete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the case by ID
        const result = await Case.findByIdAndDelete(id);

        if (result) {
            res.status(200).json({ message: 'success' });
        } else {
            res.status(404).json({ message: 'Case not found' });
        }
    } catch (error) {
        console.error("Error deleting case:", error);
        res.status(500).json({ message: 'error', error });
    }
});

////////////////////////////////////////////////////////////
///Decision

app.post('/Dsave', async (req, res) => {
    const { data } = req.body;

    try {
        // Save the new decision
        const newDecision = new Decision(data);
        await newDecision.save();

        // Retrieve all saved decisions
        const allDecisions = await Decision.find();

        // Return success message along with all decisions
        res.status(200).json({ message: 'success', decisions: allDecisions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
});



app.delete('/Ddelete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the decision by ID
        const result = await Decision.findByIdAndDelete(id);

        if (result) {
            res.status(200).json({ message: 'success' });
        } else {
            res.status(404).json({ message: 'Decision not found' });
        }
    } catch (error) {
        console.error("Error deleting decision:", error);
        res.status(500).json({ message: 'error', error });
    }
});

//////////////////////////////////////////////////////////////
///room////////
///////////////////////////////////////////

app.post('/Rsave', async (req, res) => {
    const { data } = req.body;

    try {
        // Save the new room data
        const newRoom = new Room(data);
        await newRoom.save();

        // Retrieve all saved rooms
        const allRooms = await Room.find();

        // Return success message along with all rooms
        res.status(200).json({ message: 'success', rooms: allRooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
});

app.delete('/Rdelete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the room by ID
        const result = await Room.findByIdAndDelete(id);

        if (result) {
            res.status(200).json({ message: 'success' });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ message: 'error', error });
    }
});

//////////////////////////////////////////////////////////////
/////////shelf num

app.post('/Ssave', async (req, res) => {
    const { data } = req.body;

    try {
        // Save the new room data including shelfnum
        const newRoom = new Shelf(data);
        await newRoom.save();

        // Retrieve all saved rooms
        const allRooms = await Shelf.find();

        // Return success message along with all rooms
        res.status(200).json({ message: 'success', rooms: allRooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error });
    }
});

// Endpoint for deleting a room by ID
app.delete('/Sdelete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the room by ID
        const result = await Shelf.findByIdAndDelete(id);

        if (result) {
            res.status(200).json({ message: 'success' });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ message: 'error', error });
    }
});
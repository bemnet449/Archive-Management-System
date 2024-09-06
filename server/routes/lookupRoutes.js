const express = require('express');
const Case = require("../models/lookup/case")
const Decision = require("../models/lookup/decision")
const Room = require('../models/lookup/roomnum');
const Shelf = require('../models/lookup/shelfnum');

const router = express.Router();

router.post('/Csave', async (req, res) => {
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

router.delete('/Cdelete/:id', async (req, res) => {
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

router.post('/Dsave', async (req, res) => {
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



router.delete('/Ddelete/:id', async (req, res) => {
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

router.post('/Rsave', async (req, res) => {
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

router.delete('/Rdelete/:id', async (req, res) => {
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

router.post('/Ssave', async (req, res) => {
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
router.delete('/Sdelete/:id', async (req, res) => {
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

module.exports = router;
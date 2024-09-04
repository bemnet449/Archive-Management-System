const express = require('express');
const Scanned = require('../models/scanmodel');

const router = express.Router();

router.post("/S", async (req, res) => {
    const { volumenum, doctype, content, keyword, addinfo } = req.body;

    try {
        const scanfile = new Scanned({
            volumenumber: volumenum,
            documenttype: doctype,
            content,
            keywords: keyword,
            addinfo
        });

        await scanfile.save();
        res.json({ message: "success", data: scanfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error", error });
    }
});

router.post("/Searchscan", async (req, res) => {
    const { volumenumber } = req.body;

    try {
        const result = await Scanned.find({ volumenumber }); // Find all records with the specified volumenumber

        if (result.length > 0) {
            res.json({ message: "success", data: result });
        } else {
            res.json({ message: "no data found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "error", error: err.message });
    }
});



router.delete("/delete/:scanfileId", async (req, res) => {
    const { scanfileId } = req.params;

    try {
        const result = await Scanned.findByIdAndDelete(scanfileId);
        if (result) {
            res.json({ message: "success", data: result });
        } else {
            res.status(404).json({ message: "File not found" });
        }
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ message: "error", error: error.message });
    }
});

module.exports = router;
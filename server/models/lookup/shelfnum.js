const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
    worktype: {
        type: String,
        required: true
    },
    roomnum: {
        type: Number,
        required: true
    },
    shelfnum: {
        type: Number,  // Adding shelf number
        required: true
    },
    remark: {
        type: String,
        required: true
    }
});

const ShelfModel = mongoose.model("shelf", shelfSchema);

module.exports = ShelfModel;

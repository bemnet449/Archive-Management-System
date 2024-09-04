const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    worktype: {
        type: String,
        required: true
    },
    roomnum: {
        type: Number,
        required: true
    },
    remark: {
        type: String,
        required: true
    }
});

const RoomModel = mongoose.model("Room", roomSchema);

module.exports = RoomModel;

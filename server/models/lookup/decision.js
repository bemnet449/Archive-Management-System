const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({
    amharic: { type: String },
    english: { type: String },
    tigrigna: { type: String },
    oromic: { type: String },
    somali: { type: String },
    afar: { type: String },
    remark: { type: String }
});

const DecisionModel = mongoose.model('decisions', decisionSchema);

module.exports = DecisionModel;

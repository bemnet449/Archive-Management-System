const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    case: {
        amharic: { type: String },
        english: { type: String },
        tigrigna: { type: String },
        oromic: { type: String },
        somali: { type: String },
        afar: { type: String },
    },
    remark: {
        type: String,
    }
});

const CaseModel = mongoose.model('cases', caseSchema);

module.exports = CaseModel;

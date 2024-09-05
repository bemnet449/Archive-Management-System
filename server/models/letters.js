const mongoose = require('mongoose');

const DecisionDetails = new mongoose.Schema({
  employee: { 
    type: String,
    required: true 
  }, // Employee to whom the letter is sent
    decisionDate: {
    type: Date,
    required: true
  }, // Date on which the letter is sent for decision
    decision: {
    type: String, 
    required: true 
  }, // Decision
    decisionDescription: {
    type: String, 
    required: true 
  }, // Decision description
    remark: { 
      type: String 
  }, // Remarks
});

const correspondenceSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  fileNumber: {
    type: Number,
    required: true,
  },
  volumeNumber: {
    type: Number,
    required: true,
  },
  nameOfOrg: {
    type: String,
    required: true,
  },
  correspondenceType: {
    type: String,
    enum: ['IN (ENTERING)', 'OUT (LEAVING)'], // Letter type options
    required: true,
  },
  receiverSender: {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    grandfatherName: { type: String, required: true },
  },
  archiveEmployee: {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    grandfatherName: { type: String, required: true },
  },
  title: {
    type: String,
    required: true,
  },
  letterNumber: {
    type: Number,
    required: true,
  },
  attachmentNumber: {
    type: Number,
    required: true,
  },
  className: {
    type: String,
    enum: ['type 1', 'type 2', 'type 3'], // Class type options
    required: true,
  },
  caseType: {
    type: String,
    enum: ['type 1', 'type 2', 'type 3'], // Case type options
    required: true,
  },
  language: {
    type: String,
    enum: ['ENGLISH', 'AMHARIC'], // Language options
    required: true,
  },
  urgencyLevel: {
    type: String,
    enum: ['regular', 'urgent', 'very urgent'], // Urgency level options
    required: true,
  },
  contentOfLetter: {
    type: String, // or true if it is mandatory
  },
  writtenDate: {
    type: Date,
    required: true,
  },
  entryDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Time stored as string
    required: true,
  },
  wayOfDelivery: {
    type: String,
    enum: ['post office', 'fax', 'email'], // Include all possible values
    required: true, // or false if it is optional
  },
  reviews: {
    type: String, // To store any reviews or remarks
  },
  decisionDetails: [DecisionDetails],
}, { timestamps: true });

const Letter = mongoose.model('Letter', correspondenceSchema);

module.exports = Letter;

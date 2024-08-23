const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for folder details
const FolderDetailsSchema = new Schema({
  roomNumber: {
    type: Number,
    required: [true, 'Room number is required'],
  },
  shelfNumber: {
    type: Number,
    required: [true, 'Shelf number is required'],
  },
  lateralNumber: {
    type: Number,
    required: [true, 'Lateral number is required'],
  },
  volumeNumber: {
    type: Number,
    required: [true, 'Volume number is required'],
  },
  fileCabinetNumber: {
    type: Number,
    required: [true, 'File cabinet number is required'],
  },
  dateOpened: {
    type: Date,
    required: [true, 'Date opened is required'],
  },
  dateClosed: {
    type: Date,
  },
  remark: {
    type: String,
    trim: true,
  }
});

// Schema for User with nested folder details
const UserSchema = new Schema({
  folderNumber: {
    type: String,
    required: [true, 'Folder number is required'],
    trim: true,
  },
  folderType: {
    type: String,
    required: [true, 'Folder type is required'],
    trim: true,
  },
  organizationName: {
    type: String,
    required: [true, 'Organization name is required'],
    enum: {
      values: ['ETTE', 'Other'],
      message: 'Organization name must be either ETTE or Other',
    },
    default: 'ETTE',
  },
  folderStatus: {
    type: String,
    required: [true, 'Folder status is required'],
    enum: {
      values: ['Active', 'Semiactive', 'Dead'],
      message: 'Folder status must be one of Active, Semiactive, or Dead',
    },
    default: 'Active',
  },
  caseType: {
    type: String,
    required: [true, 'Case type is required'],
    enum: {
      values: ['Salary Study', 'Type 2', 'Type 3'],
      message: 'Case type must be one of Salary Study, Type 2, or Type 3',
    },
    default: 'Salary Study',
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  fatherName: {
    type: String,
    required: [true, 'Father\'s name is required'],
    trim: true,
  },
  grandfatherName: {
    type: String,
    required: [true, 'Grandfather\'s name is required'],
    trim: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
  folderDetails: [FolderDetailsSchema], // Embedding folder details
});

// Create and export the User model
const User = mongoose.model('user', UserSchema); // Ensure model name is singular

module.exports = User;

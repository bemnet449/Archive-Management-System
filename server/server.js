const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const folderRoutes = require('./routes/folderRoutes');
const foldBorrRoutes = require('./routes/foldBorrRoutes');
const lettersRoutes = require('./routes/lettersRoutes');
const scanRoutes = require('./routes/scanRoutes');
const lookupRoutes = require('./routes/lookupRoutes');

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
app.use(lookupRoutes);
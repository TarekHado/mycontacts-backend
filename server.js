const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const contacts = require('./routes/contacts');
const errorHandler = require('./middleware/errorHandler');

mongoose.connect('mongodb://localhost/mycontacts-backend')
    .then(() => console.log('connected to mycontacts-backend'))
    .catch(err => console.log(err.message));

app.use(express.json());
app.use(errorHandler);
app.use('/api/contacts', contacts);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

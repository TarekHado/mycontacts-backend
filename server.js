const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const contacts = require('./routes/contacts');
const users = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConections');

connectDb();
app.use(express.json());
app.use(errorHandler);
app.use('/api/contacts', contacts);
app.use('/api/users', users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

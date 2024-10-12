// It contains the logic part of our routes (dealing with req and res params)
const asyncHandler = require('express-async-handler');

const getContacts = asyncHandler(async(req, res) => {
    res.status(200).send('Get all contacts');
});

const createContact = asyncHandler(async(req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(201).send('create a contact');
});

const getContact = asyncHandler(async(req, res) => {
    res.status(200).send(`Get the contact for ${req.params.id}`);
});

const updateContact = asyncHandler(async(req, res) => {
    res.status(200).send(`Update the contact for ${req.params.id}`);
});

const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).send(`Delete the contact for ${req.params.id}`);
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};
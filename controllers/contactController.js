// It contains the logic part of our routes (dealing with req and res params)
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contact');

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user: req.user.id });
    res.status(200).send(contacts);
});

const createContact = asyncHandler(async(req, res) => {
    const { name, email, phone  } = req.body;
    if (!name || !email || !phone) {
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const contact = new Contact({
        name,
        email,
        phone,
        user: req.user.id
    });
    await contact.save();
    res.status(201).send(contact);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) res.status(404).send('Contact is not found');
    res.status(200).send(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Can't update other user's contacts ");
    }
    const udatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).send(udatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (contact.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Can't delete other user's contacts ");
    }
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) res.status(404).send('Contact is not found');
    res.status(200).send(deleted);
});

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};
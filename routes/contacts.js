const express = require('express');
const { request } = require('http');
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');

router.get('/', getContacts).post('/', createContact);

router.get('/:id', getContact)
    .put('/:id', updateContact)
    .delete('/:id', deleteContact);

module.exports = router;

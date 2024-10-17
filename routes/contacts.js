const express = require('express');
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', getContacts).post('/', createContact);

router.get('/:id', getContact)
    .put('/:id', updateContact)
    .delete('/:id', deleteContact);

module.exports = router;

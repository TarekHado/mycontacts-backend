const mongoose = require('mongoose');
const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the contact name']
    },

    email: {
        type: String,
        required: [true, 'Please add the contact email address']
    },

    phone: {
        type: String,
        required: [true, 'Please add the contact phone number']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Contact', contactsSchema);


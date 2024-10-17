const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: [true, 'please enter the username'],
        type: String,
        unique: [true, 'username address already taken']

    },
    email: {
        required: [true, 'please enter the email'],
        type: String,
        unique: [true, 'email address already taken']
    },
    password: {
        required: [true, 'please enter the password'],
        type: String
    }
},{
    timestamps: true,
});
const User = mongoose.model('User', userSchema);

exports.User = User;
exports.userSchema = userSchema;
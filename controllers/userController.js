// It contains the logic part of our routes (dealing with req and res params)
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

const register = asyncHandler(async (req, res) => {
    let { username, email, password } = req.body;
    if (!username || !email || !password) res.status(400).send('All fields are mandatory');
    let user = await User.findOne({email});
    if (user) res.status(400).send('User is already registerd');
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    user = new User({
        username,
        email,
        password: hashed
    });
    await user.save();
    res.status(200).send({_id: user.id, username: user.username, email: user.email});
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).send('All fields are mandatory');
    let user = await User.findOne({ email });
    if (!user) res.status(400).send('User not found, please register');
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '90m'});
        res.status(200).json({ token });
    } else {
        res.status(401).send('wrong password');
    }
});

const current = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { register, login, current };
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

module.exports =  asyncHandler(async (req, res, next) => {
    const token = req.header('auth');
    if (!token) return res.status(401).send('Access Denied. No Token Provided');

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token.');
    }
})


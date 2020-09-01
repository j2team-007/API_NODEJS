const jwt = require('jsonwebtoken');
const User = require('../model/User.js')

module.exports = async function (req, res, next) {
    try {
        const token = req.header('auth-token');
        jwt.verify(token, process.env.TOKEN_SECRET);
        if(!token) { return res.status(400).send('Login was denied!'); }
        next();
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
}
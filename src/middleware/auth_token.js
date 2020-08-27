const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = req.header('auth-token');
        if(!token) { return res.status(400).send('Login was denied!'); }
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
}
const User = require('../model/User.js');
const { validatorRegister, validatorLogin } = require('../validate/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class RegisterController {

	async register(req, res, next) {
        const { error } = validatorRegister(req.body);
        const matchEmail = await User.findOne({email: req.body.email});
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password , salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });

        if (error) { return res.status(400).send(error.details[0].message); }

        if(matchEmail) { return res.status(400).send('Email already exists!'); }

        try {
            const saveUser = await user.save();
            res.json({ id: saveUser._id });
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
    async login(req, res, next) {
        const { error } = validatorLogin(req.body);
        if (error) { return res.status(400).send(error.details[0].message); }
        
        const user = await User.findOne({email: req.body.email});
        if(!user) { return res.status(400).send('Email Was Wrong!'); }
        
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) { return res.status(400).send('Password Was Wrong!'); }

        try {
            var token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    posts (req, res, next) { 
        try {
            res.json({
                post: 'This is post',
                action: 'POST',
            });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new RegisterController;

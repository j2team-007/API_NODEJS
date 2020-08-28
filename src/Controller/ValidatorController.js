const User = require('../model/User.js');
const Desks = require('../model/Desk.js');
const { validatorRegister, validatorLogin } = require('../validate/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class RegisterController {

	async register(req, res, next) {
        try {
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
    
            const saveUser = await user.save();
            res.json({ id: saveUser._id });
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
    async login(req, res, next) {
        try {
            const { error } = validatorLogin(req.body);
            const user = await User.findOne({email: req.body.email});
            const match = await bcrypt.compare(req.body.password, user.password);
            var token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            
            if (error) { return res.status(400).send(error.details[0].message); }
            
            if(!user) { return res.status(400).send('Email Was Wrong!'); }
            
            if(!match) { return res.status(400).send('Password Was Wrong!'); }
            
            res.header('auth-token', token).send(token);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async posts (req, res, next) { 
        try {
            res.json({
                post: 'This is post',
                action: 'POST',
            });
        } catch (error) {
            next(error);
        }
    }

    async createDeskUser (req, res, next) {
        try {
            // create a documment by Model Desks
            const Desk = new Desks(req.body);
            // return query if find user by one of id
            const user = await User.findById(req.params.idUser);
            // create key owner have value is a document user 
            Desk.owner = user;
            // save document Desk
            await Desk.save();
            // push id one of a document in array
            user.Desk.push(Desk._id);
            // save document user
            await user.save();
            // return result client
            return res.status(201).json({Desk: Desk});
        } catch (error) {
            res.status(400).send(error);
            next(error);
        }
    }

    async getDeskUser (req, res, next) {
        try {
            // find all document have field was desk 
            const user = await User.findById(req.params.idUser).populate('Desk');
            console.log(user);
            // return result client
            return res.status(200).json({ Desk: user.Desk });
        } catch (error) {
            res.status(400).send(error);
            next(error);
        }
    }

}

module.exports = new RegisterController;

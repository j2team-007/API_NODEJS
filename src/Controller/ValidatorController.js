const User = require('../model/User.js');
const Desks = require('../model/Desk.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class RegisterController {

	async register(req, res, next) {
        try {
            const matchEmail = await User.findOne({email: req.body.email});
            if(matchEmail) { return res.status(400).send('Email already exists!'); }
            const user = new User(req.body);
            await user.generateAuthToken();
            res.status(201).json({ message: 'Register success!!!' });
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
    async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            const match = bcrypt.compare(req.body.password, user.password);
            if(!user) { return res.status(400).send('Email Was Wrong!'); }
            if(!match) { return res.status(400).send('Password Was Wrong!'); }
            const token = await user.generateAuthToken();
            res.status(200).header('auth-token', token).json({ token });
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
            // return result client
            return res.status(200).json({ Desk: user.Desk });
        } catch (error) {
            res.status(400).send(error);
            next(error);
        }
    }

}

module.exports = new RegisterController;

const Joi = require('joi');

function validateParamId (req, res, next) {
    const paramId = Joi.object({
        idUser: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    });
    try {
        const { error } = paramId.validate({ idUser: req.params.idUser });
        if(error) { return res.status(400).send({ error: error.details[0].message }) }
        next();
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
}

function validateRegister (req, res, next) {
    const schemaUser = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6),
    });
    try {
        const { error } = schemaUser.validate(req.body);
        if(error) { return res.status(400).send({ error: error.details[0].message }) }
        next();
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
}

function validateLogin (req, res, next) {
    const schemaUser = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6),
    });
    try {
        const { error } = schemaUser.validate(req.body);
        if(error) { return res.status(400).send({ error: error.details[0].message }) }
        next();
    } catch (error) {
        res.status(400).send(error);
        next(error);
    }
}

module.exports = { validateParamId, validateRegister, validateLogin };

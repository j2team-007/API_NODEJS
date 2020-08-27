const Joi = require('joi');

const validatorRegister = data => {
    const schemaUser = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6),
    });
    return schemaUser.validate(data);
}

const validatorLogin = data => {
    const schemaUser = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6),
    });
    return schemaUser.validate(data);
}

module.exports = { validatorRegister, validatorLogin };
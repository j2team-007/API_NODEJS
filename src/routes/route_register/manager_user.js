const express = require('express');
const app = express();
const router = express.Router();
const ValidatorController = require('../../Controller/ValidatorController.js');
const Authenticate = require('../../middleware/auth_token.js');
const helper = require('../../middleware/validate.js');

router.get('/posts', Authenticate, ValidatorController.posts);

router.post('/register', helper.validateRegister, ValidatorController.register);

router.post('/login', helper.validateLogin, ValidatorController.login);

router.post('/:idUser/Desk', helper.validateParamId, ValidatorController.createDeskUser);

router.get('/:idUser/Desk', helper.validateParamId, ValidatorController.getDeskUser);

module.exports = router;

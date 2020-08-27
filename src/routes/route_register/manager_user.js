const express = require('express');
const app = express();
const router = express.Router();
const ValidatorController = require('../../Controller/ValidatorController.js');
const auth = require('../../middleware/auth_token.js');

router.get('/posts', auth, ValidatorController.posts);

router.post('/register', ValidatorController.register);

router.post('/login', ValidatorController.login);

module.exports = router;

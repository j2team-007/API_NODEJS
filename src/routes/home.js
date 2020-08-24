const express = require('express');
const router = express.Router();
const HomeController = require('../Controller/HomeController.js')

router.get('/', HomeController.renderHome);

module.exports = router;

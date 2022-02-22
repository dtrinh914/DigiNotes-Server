const express = require('express');
const router = module.exports = express.Router();

router.use('/notes', require('./notes'));
router.use('/notebooks', require('./notebooks'));
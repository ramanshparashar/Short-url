const express = require('express');
const { handleSignUp,handlelogin} = require('../controllers/user')

const router = express.Router();

router.post('/',handleSignUp)
router.post('/login',handlelogin)

module.exports = router
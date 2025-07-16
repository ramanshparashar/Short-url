const express = require('express');
const {GenerateShortURL,GetAnalytics} = require('../controllers/url');

const router = express.Router();

/* This code snippet is defining routes for handling HTTP GET and POST requests to the '/url' endpoint. */
router.post("/",GenerateShortURL)

router.get('/analytics/:shortId',GetAnalytics)

module.exports = router;
const express = require('express');
const router = express.Router();
const attemptsController = require('../controller/attemptsController');

router.post('/attempts', attemptsController.startAttempt)
router.post('/attempts/:id/submit', attemptsController.submit)



module.exports = router;
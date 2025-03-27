// /routes/passRoutes.js
const express = require('express');
const router = express.Router();
const { generatePass } = require('../controllers/passController'); // Import the controller

// Route to generate a pass
router.get('/generate-pass', generatePass);

module.exports = router;

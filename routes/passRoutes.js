// In passRoutes.js
const express = require('express');
const router = express.Router();
const { createPass } = require('../controllers/passController'); // Updated to call createPass instead

// Route to generate a pass
router.post('/generate-pass', createPass);

module.exports = router;


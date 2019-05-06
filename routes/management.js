const express = require('express');

const router = express.Router();

const { authenticate } = require('../controller/managementController');

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
router.post('/authenticate', authenticate);

module.exports = router;

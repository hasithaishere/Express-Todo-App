var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ success: false, message: 'Authentication failed. User not found.' });
});

module.exports = router;

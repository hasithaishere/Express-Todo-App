const express = require('express');

const router = express.Router();

const { authCheck } = require('../lib/helpers/middleware');

/* GET users listing. */
router.get('/', authCheck, (req, res) => {
    const { success, message = null, decoded } = req.logged;
    if (!success) {
        res.json({ success, message });
    } else {
        const { name, _id: id, admin: isAdmin } = decoded;
        res.json({ success, message: 'Authentication success, welcome to system.', data: { name, id, isAdmin } });
    }
});

module.exports = router;

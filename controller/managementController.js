const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config'); // get our config file
const User = require('../models/user'); // get our mongoose model

const authenticate = async (req, res) => {
    const user = await User.findOne({
        name: req.body.name,
    });

    if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
        // check if password matches
        if (user.password !== req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
            // if user is found and password is right
            // create a token
            const token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 86400, // expires in 24 hours
            });

            res.json({
                success: true,
                message: 'Enjoy your token!',
                token,
            });
        }
    }
};

module.exports = {
    authenticate,
};

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file

module.exports = {
	// ---------------------------------------------------------
	// route middleware to authenticate and check token
	// ---------------------------------------------------------
	authCheck: function(req, res, next) {

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.params.token || req.headers['x-access-token'];

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token, config.secret, function(err, decoded) {	
				if (err) {
					req.logged = { 
						status: 401,
						success: false, 
						message: 'Failed to authenticate token.' 
					};
					next();		
				} else {
					// if everything is good, save to request for use in other routes
					req.logged = { 
						status: 200,
						success: true, 
						decoded: decoded 
					};
					next();
				}
			});

		} else {

			// if there is no token
			// return an error
			req.logged = { 
				status: 403,
				success: false, 
				message: 'No token provided.'
			};
			next();
		}
	}
}
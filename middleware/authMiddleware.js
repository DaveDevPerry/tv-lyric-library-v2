const jwt = require('jsonwebtoken');
const User = require('../models/User');

// this gets called for any route requiring authentication ***********************
const requireAuth = (req, res, next) => {
	// grab token from cookies
	const token = req.cookies.jwt;
	// check jwt exist and is verified - using method of jsonwebtoken
	if (token) {
		// use same secret created  when creating jwt
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};

// check current user so we can return that users data
const checkUser = (req, res, next) => {
	// grab token from cookies
	const token = req.cookies.jwt;
	// check exists
	if (token) {
		// use same secret created  when creating jwt
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				// means valid user logged in
				console.log(decodedToken);
				let user = await User.findById(decodedToken.id);
				// inject user data in to views - using .locals
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { requireAuth, checkUser };

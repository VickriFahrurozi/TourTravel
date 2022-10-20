/** @format */

const jwt = require('jsonwebtoken');
const Auth = {
	VerifyToken: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (
					decoded.role == process.env.ROLE_ADMIN ||
					decoded.role == process.env.ROLE_USER ||
					decoded.role == process.env.ROLE_SUPER_USER
				) {
					next();
				} else {
					return res.status(404).send({
						message: 'ROLE TIDAK TERIDENTIFIKASI',
					});
				}
			});
		} else {
			return res.status(404).send({
				message: 'KAMU HARUS LOGIN SEBELUM MELAKUKAN ACTION INI',
			});
		}
	},
	VerifyAdminRole: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (
					decoded.role == process.env.ROLE_ADMIN ||
					decoded.role == process.env.ROLE_SUPER_USER
				) {
					next();
				} else {
					return res.status(404).send({
						message: 'YOU HAVE NO ACCESS TO DO THIS ACTION',
					});
				}
			});
		} else {
			return res.status(404).send({
				message: 'YOU NEED TO LOGIN FIRST',
			});
		}
	},
	VerifySuperUser: (req, res, next) => {
		if (req.headers.token) {
			const token = req.headers.token;
			jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
				if (err) {
					return res.status(404).send({
						message: 'INVALID TOKEN',
					});
				} else if (decoded.role == process.env.ROLE_SUPER_USER) {
					next();
				} else {
					return res.status(404).send({
						message: 'YOU HAVE NO ACCESS TO DO THIS ACTION',
					});
				}
			});
		} else {
			return res.status(404).send({
				message: 'YOU NEED TO LOGIN FIRST',
			});
		}
	},
};
module.exports = Auth;


//
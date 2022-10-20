/** @format */

const Account = require('../model/account');
module.exports = {
	getAllAccount: async (req, res) => {
		try {
			const results = await Account.getAllAccount(req, res);
			return res.status(200).send(results);
		} catch (error) {
			return res.status(500).send(error);
		}
	},
	deleteAccount: async (req, res) => {
		try {
			const results = await Account.DeleteAccount(req, res);
			return res.status(200).send(results);
		} catch (error) {
			return res.status(500).send(error);
		}
	},
};

//

/** @format */

const Package = require('../model/package');

module.exports = {
	addNewPackage: async (req, res) => {
		//add New post From Body
		try {
			const result = await Package.addNewPackage(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	getAllPackage: async (req, res) => {
		//add New post From Body
		try {
			const result = await Package.getAllPackage(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	getSinglePackage: async (req, res) => {
		//add New post From Body
		try {
			const result = await Package.getSinglePackage(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deletePackage: async (req, res) => {
		//add New post From Body
		try {
			const result = await Package.DeletePackage(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	updatePackage: async (req, res) => {
		//add New post From Body
		try {
			const result = await Package.UpdatePackage(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};

//
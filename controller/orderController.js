/** @format */

const Order = require('../model/order');

module.exports = {
	addNewOrder: async (req, res) => {
		//add New post From Body
		try {
			const result = await Order.addNewOrder(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	getAllOrder: async (req, res) => {
		//add New post From Body
		try {
			const result = await Order.getAllOrder(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	getSingleAccountOrder: async (req, res) => {
		//add New post From Body
		try {
			const result = await Order.getSingleAccountOrder(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	deleteOrder: async (req, res) => {
		//add New post From Body
		try {
			const result = await Order.DeleteOrder(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	updateOrder: async (req, res) => {
		//add New post From Body
		try {
			const result = await Order.UpdateOrder(req, res);
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	},
};

//
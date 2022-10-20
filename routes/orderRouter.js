/** @format */

const express = require('express');
const orderController = require('../controller/orderController');
const router = express.Router();
const verifyAuth = require('../helper/verifyAuth');

router.post('/', verifyAuth.VerifyToken, orderController.addNewOrder);
router.get('/', verifyAuth.VerifyAdminRole, orderController.getAllOrder);
router.delete('/', verifyAuth.VerifyAdminRole, orderController.deleteOrder);
router.patch('/', verifyAuth.VerifyAdminRole, orderController.updateOrder);
router.get(
	'/id',
	verifyAuth.VerifyToken,
	orderController.getSingleAccountOrder
);

module.exports = router;

//
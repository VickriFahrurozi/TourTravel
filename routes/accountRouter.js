/** @format */

const express = require('express');
const accountController = require('../controller/accountController');
const router = express.Router();
const verifyAuth = require('../helper/verifyAuth');

router.get('/', verifyAuth.VerifyAdminRole, accountController.getAllAccount);
router.delete('/', verifyAuth.VerifySuperUser, accountController.deleteAccount);

module.exports = router;

//
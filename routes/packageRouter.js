/** @format */

const express = require('express');
const packageController = require('../controller/packageController');
const router = express.Router();
const upload = require('../helper/multer');
const verifyAuth = require('../helper/verifyAuth');

router.post(
	'/',
	verifyAuth.VerifyAdminRole,
	upload.single('package_image'),
	packageController.addNewPackage
);
router.get('/', packageController.getAllPackage);
router.get('/id', packageController.getSinglePackage);
router.delete('/', verifyAuth.VerifyAdminRole, packageController.deletePackage);
router.patch(
	'/',
	verifyAuth.VerifyAdminRole,
	upload.single('package_image'),
	packageController.updatePackage
);

module.exports = router;

//
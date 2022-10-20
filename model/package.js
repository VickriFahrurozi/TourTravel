/** @format */

const db = require('../helper/db_connections');
const { deletecover, updatecover } = require('../helper/updatefiles');
const FileValidation = require('../helper/filevalidation');

module.exports = {
	addNewPackage: (req, res) => {
		return new Promise((resolve, reject) => {
			const {
				package_name,
				package_image,
				package_description,
				package_price,
				package_date,
			} = req.body;
			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						success: false,
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
						status: 400,
					});
				} else {
					db.query(
						`INSERT into package (package_name,package_image,package_description,package_price,package_date) 
					   Values ("${package_name}","${req.file.filename}" ,"${package_description}","${package_price}","${package_date}")`,
						(err, result) => {
							if (err) {
								reject({
									success: false,
									message: 'Data Package Gagal Di Tambahkan',
									status: 400,
								});
							} else {
								resolve({
									success: true,
									message: 'Package Berhasil Di Tambahkan !',
									status: 200,
									result,
								});
							}
						}
					);
				}
			} else {
				res.status(400).send({
					message: 'Foto Package Tidak Boleh Kosong',
				});
			}
		});
	},
	getAllPackage: (req, res) => {
		//get All Movies With Join
		return new Promise((resolve, reject) => {
			const { limit, page, order_by, sort } = req.query;
			let offset = page * limit - limit;
			db.query(
				`SELECT * from package ORDER BY ${order_by} ${sort} limit ${limit} OFFSET ${offset} `,
				(error, result) => {
					if (error) {
						reject({
							success: false,
							message: `Failed To get Package , ${error}`,
							status: 400,
						});
					} else {
						db.query(`select * from package`, (error2, result2) => {
							let totalpage = Math.ceil(result2.length / limit);
							resolve({
								success: true,
								message: 'Get All Package Success',
								status: 200,
								totalpage: totalpage,
								totalRow: result.length,
								totaldata: result2.length,
								result: result,
							});
						});
					}
				}
			);
		});
	},
	getSinglePackage: (req, res) => {
		//get All Movies With Join
		return new Promise((resolve, reject) => {
			const { package_id } = req.query;
			db.query(
				`SELECT * from package where package_id = ${[package_id]} `,
				(error, result) => {
					if (error) {
						reject({
							success: false,
							message: `Failed To get Package, ${error}`,
							status: 400,
						});
					} else {
						if (!result.length) {
							reject({
								success: false,
								message: `Package With Id ${package_id} Not Found`,
								status: 400,
							});
						} else {
							resolve({
								success: true,
								message: 'Get Single Package Success',
								status: 200,
								result: result,
							});
						}
					}
				}
			);
		});
	},
	DeletePackage: (req, res) => {
		return new Promise((resolve, reject) => {
			const { package_id } = req.query;
			db.query(
				`select * from package where package_id = ${package_id}`,
				(err, result) => {
					if (!result.length || err) {
						reject({
							success: false,
							message: `Package With ID = ${package_id} Not Found `,
						});
					} else {
						deletecover(`./upload/${result[0].package_image}`);
						db.query(
							`delete from package where package_id = "${package_id}" `,
							(err, result) => {
								if (err) {
									reject({
										success: false,
										message: `Failed Delete Package , ${err} `,
									});
								} else {
									resolve({
										success: true,
										message: `Package With ID = ${package_id} has been deleted`,
										status: 200,
										result,
									});
								}
							}
						);
					}
				}
			);
		});
	},
	UpdatePackage: (req, res) => {
		return new Promise((resolve, reject) => {
			const {
				package_image,
				package_name,
				package_description,
				package_price,
				package_date,
			} = req.body;
			const { package_id } = req.query;
			if (req.file) {
				if (FileValidation(req.file.filename) != 1) {
					reject({
						success: false,
						message:
							'Format File Tidak Didukung ! , Format Yang Di Izinkan : Jpg,Png,Jpeg,Webp',
						status: 400,
					});
				} else {
					if (updatecover(package_id) == 0) {
						reject({
							success: false,
							message: 'PACKAGE NOT FOUND',
						});
					} else {
						db.query(
							`UPDATE package SET package_image='${req.file.filename}', package_name='${package_name}',package_price='${package_price}',package_description = '${package_description}',package_date='${package_date}'
					   where package_id = '${package_id}'`,
							(err, result) => {
								if (err) {
									reject({
										success: false,
										message: 'Failed Update Package Data',
										status: 400,
									});
								} else {
									resolve({
										success: true,
										message: 'Package has been updated',
										status: 200,
										result: result,
									});
								}
							}
						);
					}
				}
			} else {
				db.query(
					`UPDATE package SET package_name='${package_name}',package_price='${package_price}',package_description = '${package_description}',package_date='${package_date}'
					   where package_id = '${package_id}'`,
					(err, result) => {
						if (err) {
							reject({
								success: false,
								message: 'Failed Update Package Data',
								status: 400,
							});
						} else {
							resolve({
								success: true,
								message: 'Package has been updated',
								status: 200,
								result: result,
							});
						}
					}
				);
			}
		});
	}, //
};

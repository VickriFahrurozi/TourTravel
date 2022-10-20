/** @format */

const db = require('../helper/db_connections');

module.exports = {
	addNewOrder: (req, res) => {
		return new Promise((resolve, reject) => {
			const { customer_id, package_id, quantity, price } = req.body;
			console.log(req.body);
			const total_price = quantity * price;
			db.query(
				`INSERT into orders (customer_id,order_total_price) 
					   Values ("${customer_id}","${total_price}")`,
				(err, result) => {
					if (err) {
						reject({
							success: false,
							message: 'Data Order Gagal Di Tambahkan',
							status: 400,
						});
					} else {
						const lastid = result.insertId;
						db.query(
							`UPDATE orders SET order_number='${lastid}' where order_id = '${lastid}'`,
							(err2, result2) => {
								if (err2) {
									reject({
										success: false,
										message: 'Data Order Number Gagal Di Tambahkan',
										status: 400,
									});
								} else {
									db.query(
										`INSERT into orders_detail (order_id,package_id,quantity,total_price) 
					                     Values ("${lastid}","${package_id}","${quantity}","${total_price}")`,
										(err3, result3) => {
											if (err3) {
												reject({
													success: false,
													message: `Data Order Details Gagal Di Tambahkan, ${err3} `,
													status: 400,
												});
											} else {
												resolve({
													success: true,
													message: 'Order Berhasil Di Tambahkan !',
													status: 200,
													result,
												});
											}
										}
									);
								}
							}
						);
					}
				}
			);
		});
	},
	getAllOrder: (req, res) => {
		//get All Movies With Join
		return new Promise((resolve, reject) => {
			const { limit, page, order_by, sort } = req.query;
			let offset = page * limit - limit;
			db.query(
				`SELECT * from orders INNER JOIN orders_detail ON orders.order_id = orders_detail.order_id ORDER BY ${order_by} ${sort} limit ${limit} OFFSET ${offset} `,
				(error, result) => {
					if (error) {
						reject({
							success: false,
							message: `Failed To get Order , ${error}`,
							status: 400,
						});
					} else {
						db.query(`select * from orders`, (error2, result2) => {
							let totalpage = Math.ceil(result2.length / limit);
							resolve({
								success: true,
								message: 'Get All Order Success',
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
	getSingleAccountOrder: (req, res) => {
		//get All Movies With Join
		return new Promise((resolve, reject) => {
			const { customer_id } = req.query;
			db.query(
				`SELECT * FROM orders INNER JOIN orders_detail ON orders.order_id = orders_detail.order_id 
				INNER JOIN package ON orders_detail.package_id = package.package_id
				where customer_id = ${customer_id} ORDER BY orders.order_id `,
				(error, result) => {
					if (error) {
						reject({
							success: false,
							message: `Failed To get Order, ${error}`,
							status: 400,
						});
					} else {
						if (!result.length) {
							reject({
								success: false,
								message: `You Have No Order`,
								status: 400,
							});
						} else {
							resolve({
								success: true,
								message: 'Get Single Order Success',
								status: 200,
								result: result,
							});
						}
					}
				}
			);
		});
	},
	DeleteOrder: (req, res) => {
		return new Promise((resolve, reject) => {
			const { order_id } = req.query;
			db.query(
				`delete from orders where order_id = "${order_id}" `,
				(err, result) => {
					if (err) {
						reject({
							success: false,
							message: `Failed Delete Order , ${err} `,
						});
					} else {
						resolve({
							success: true,
							message: `Order With ID = ${order_id} has been deleted`,
							status: 200,
							result,
						});
					}
				}
			);
		});
	},
	UpdateOrder: (req, res) => {
		return new Promise((resolve, reject) => {
			const { order_status } = req.body;
			const { order_id } = req.query;
			db.query(
				`UPDATE orders SET order_status='${order_status}'
					   where order_id = '${order_id}'`,
				(err, result) => {
					if (err) {
						reject({
							success: false,
							message: `Failed Update Order Data ${err}`,
							status: 400,
						});
					} else {
						resolve({
							success: true,
							message: 'Order Status has been updated',
							status: 200,
							result: result,
						});
					}
				}
			);
		});
	},
};

//
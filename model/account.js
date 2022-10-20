/** @format */

const db = require('../helper/db_connections');

module.exports = {
	getAllAccount: (req, res) => {
		return new Promise((resolve, reject) => {
			const { limit, page, order_by, sort } = req.query;
			let offset = page * limit - limit;
			db.query(
				`SELECT * from account INNER JOIN customer on account.account_id = customer.customer_id ORDER BY account.${order_by} ${sort} limit ${limit} OFFSET ${offset} `,
				(error, result) => {
					if (error) {
						reject({
							success: false,
							message: `Failed To get Account , ${error}`,
							status: 400,
						});
					} else {
						db.query(`select * from account `, (error2, result2) => {
							let totalpage = Math.ceil(result2.length / limit);
							resolve({
								success: true,
								message: 'Get All Account Success',
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
	DeleteAccount: (req, res) => {
		return new Promise((resolve, reject) => {
			const { account_id } = req.query;
			db.query(
				`delete from account where account_id = "${account_id}" `,
				(err, result) => {
					if (err) {
						reject({
							success: false,
							message: `Failed Delete Account , ${err} `,
						});
					} else {
						resolve({
							success: true,
							message: `Account With ID = ${account_id} has been deleted`,
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
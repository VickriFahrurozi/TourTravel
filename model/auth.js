/** @format */

const db = require('../helper/db_connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	login: (req, res) => {
		return new Promise((resolve, reject) => {
			const { email, password } = req.body;
			db.query(
				`SELECT account_id,account_password,account_role  FROM account  WHERE account_email='${email.toLowerCase()}'`,
				(err, results) => {
					if (err) {
						reject({
							success: false,
							message: 'Error When Check Account Data',
						});
					} else {
						if (!results.length) {
							reject({
								success: false,
								message: 'Email Not Found',
							});
						} else {
							bcrypt.compare(
								password,
								results[0].account_password,
								function (err, result) {
									if (err) {
										reject({
											success: false,
											message: `Password Incorrect ${err}`,
										});
									}
									if (result) {
										const token = jwt.sign(
											{
												id: results[0].account_id,
												role: results[0].account_role,
											},
											process.env.JWT_SECRET_KEY,
											{
												expiresIn: '1d',
											}
										);
										db.query(
											`select customer_name from customer where customer_id  = ${results[0].account_id}`,
											(errprofile, resultcustomer) => {
												resolve({
													success: true,
													message: 'Login Success',
													status: 200,
													data: {
														token: token,
														id: results[0].account_id,
														role: results[0].account_role,
														name: resultcustomer[0].customer_name,
													},
												});
											}
										);
									} else {
										reject({
											message: 'Incorrect Password',
										});
									}
								}
							);
						}
					}
				}
			);
		});
	},
	register: (req, res) => {
		return new Promise((resolve, reject) => {
			const { email, password, confirmpassword, name, phone_number, address } =
				req.body;
			const sqlcheckemail = `SELECT account_email from account where account_email = '${email.toLowerCase()}'`;

			if (password.length < 8) {
				reject({
					success: false,
					message: `Password Need To Be At Least 8 Character`,
				});
			} else if (confirmpassword != password) {
				reject({
					success: false,
					message: `Password And Confirm Password Not Match`,
				});
			} else {
				db.query(sqlcheckemail, (err, result) => {
					//Check Registered Email
					if (err) {
						reject({
							success: false,
							message: `Error In Your DB Query When Checking Email`,
						});
					} else if (result.length) {
						reject({
							success: false,
							message: `Email Already Registered , Use Another One `,
						});
					} else {
						//Hashing Password
						bcrypt.hash(password, 10, function (err, hashedPassword) {
							if (err) {
								reject({
									success: false,
									message: `Error When Hashing Password`,
								});
							} else {
								//INSERT DATA TO ACCOUNT TABLE
								const sqlinsertdata = `INSERT INTO account(account_email,account_password) VALUES ('${email.toLowerCase()}','${hashedPassword}')`;
								db.query(sqlinsertdata, (errinsertdata, result2) => {
									if (errinsertdata) {
										reject({
											success: false,
											message: `Error In Your DB Query When Inserted the Data`,
										});
									} else {
										//INSERT DATA TO CUSTOMER TABLE
										const lastid = result2.insertId;
										db.query(
											`insert into customer (account_id,customer_name,customer_phone_number,customer_email,customer_address) values("${lastid}","${name}","${phone_number}","${email}","${address}")`,
											(errinsertdata2, result3) => {
												if (errinsertdata2) {
													db.query(
														`DELETE FROM account WHERE account_id = '${lastid}'`
													);
													reject({
														success: false,
														message: 'Error When Insert Data To Customer Table',
													});
												} else {
													resolve({
														success: true,
														status: 200,
														message: 'Add New Account Success',
														dataAccount: result2,
														dataCustomer: result3,
													});
												}
											}
										);
									}
								});
							}
						});
					}
				});
			}
		});
	},
};

//
/** @format */

const fs = require('fs');
const db = require('./db_connections');
const deletecover = (FileLocation) => {
	fs.unlink(FileLocation, (err) => {
		if (err) {
			console.log(`Error --> FS unlink ${err}`);
		} else {
			console.log('success');
		}
	});
};
const updatecover = (package_id) => {
	db.query(
		`select package_image from package where package_id = ${package_id}`,
		(err, result) => {
			if (err) {
				console.log('error in db query');
				return 0;
			} else if (!result.length) {
				console.log('Image Data Not Found , No Image Updated');
				return 0;
			} else {
				deletecover(`./upload/${result[0].package_image}`);
				return 1;
			}
		}
	);
};

module.exports = { deletecover, updatecover };

//
/** @format */

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes');
const path = require('path');
app.use(cors());
const port = process.env.PORT || 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api/v1', router);
app.listen(port, () => {
	console.log(`Tour_Travel - Backend ${port}`);
});

//TES PUSH/PULL
//TEST PUSH 2
//
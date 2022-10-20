/** @format */

const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const packagerouter = require('./packageRouter');
const orderrouter = require('./orderRouter');
const accountrouter = require('./accountRouter');
app.use('/auth', authRouter);
app.use('/package', packagerouter);
app.use('/order', orderrouter);
app.use('/account', accountrouter);

module.exports = app;

//
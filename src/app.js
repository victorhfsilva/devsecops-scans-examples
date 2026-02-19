const express = require('express');
const healthRoutes = require('./routes/health');
const vulnerableRoutes = require('./routes/vulnerable');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', healthRoutes);
app.use('/vuln', vulnerableRoutes);

module.exports = app;
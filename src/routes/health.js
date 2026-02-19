const express = require('express');
const moment = require('moment');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'DevSecOps Security Scans Example',
    timestamp: moment().format(),
    status: 'running'
  });
});

router.get('/api/data', (req, res) => {
  res.json({
    userId: 1,
    title: 'Example data',
    body: 'This endpoint is intentionally simple for baseline checks.'
  });
});

module.exports = router;
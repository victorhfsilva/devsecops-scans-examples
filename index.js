const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'DevSecOps Security Scans Example',
    timestamp: moment().format(),
    status: 'running'
  });
});

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const data = _.pick(response.data, ['userId', 'title', 'body']);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

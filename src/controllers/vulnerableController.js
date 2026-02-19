const axios = require('axios');
const _ = require('lodash');
const { exec } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

exports.reflectedXss = (req, res) => {
  const query = req.query.q || '';
  res.send(`<h1>Resultado para: ${query}</h1>`);
};

exports.openRedirect = (req, res) => {
  const nextUrl = req.query.next || '/';
  res.redirect(nextUrl);
};

exports.serverSideRequestForgery = async (req, res) => {
  try {
    const target = req.query.url;
    const response = await axios.get(target);
    res.json({
      status: response.status,
      body: response.data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.commandInjection = (req, res) => {
  const host = req.query.host || '127.0.0.1';
  exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    return res.type('text/plain').send(stdout);
  });
};

exports.codeInjection = (req, res) => {
  try {
    const expression = req.body.expression || '2 + 2';
    const result = eval(expression);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.pathTraversal = (req, res) => {
  try {
    const fileName = req.query.file || '../package.json';
    const fullPath = path.join(process.cwd(), 'public', fileName);
    const content = fs.readFileSync(fullPath, 'utf8');
    res.type('text/plain').send(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sqlInjection = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  res.json({
    executedQuery: query,
    rows: []
  });
};

exports.prototypePollution = (req, res) => {
  const defaultConfig = { role: 'user', features: { beta: false } };
  const merged = _.merge(defaultConfig, req.body);
  res.json({
    config: merged,
    isAdmin: merged.role === 'admin'
  });
};
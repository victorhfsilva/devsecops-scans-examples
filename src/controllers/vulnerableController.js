const axios = require('axios');
const _ = require('lodash');
const { exec } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const FAKE_GITHUB_TOKEN = 'ghp_1234567890abcdefghijklmnopqrstuvwxyz';
const FAKE_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDgFakeKeyMaterial
q2v9R4jLk2tP8mQqX4rj9K9xQfWm0z0Gkq4Xb2m9SxA0V8k3uK7y2pQ9a5v3n1c8
4sN9rQ3mYk2xW8pL0sD9vJ3kL1mN8hT2pQ4rS7uV5wX2yZ6aB9cD3eF7gH1jK5lM
2nP6qR9sT3uV7wX1yZ5aC8dE2fG6hI0jK4lM8nP2qR6sT0uV4wX8yZ2aB5cD9eF3
-----END PRIVATE KEY-----`;

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
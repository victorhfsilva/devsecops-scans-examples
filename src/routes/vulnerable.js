const express = require('express');
const controller = require('../controllers/vulnerableController');

const router = express.Router();

router.get('/xss', controller.reflectedXss);
router.get('/redirect', controller.openRedirect);
router.get('/ssrf', controller.serverSideRequestForgery);
router.get('/cmd', controller.commandInjection);
router.get('/path', controller.pathTraversal);
router.post('/eval', controller.codeInjection);
router.post('/sql', controller.sqlInjection);
router.post('/pollution', controller.prototypePollution);

module.exports = router;
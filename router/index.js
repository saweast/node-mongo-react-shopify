var express = require('express');
var shop = require('./routes/shop');
var webhook = require('./routes/webhook');
var config = require('./routes/config');
var app = require('./routes/app');
var gdpr = require('./routes/gdpr');
var product = require('./routes/product');
var search = require('./routes/search');

const router = express.Router();
router.use(shop);
router.use(webhook);
router.use(config);
router.use(app);
router.use(gdpr);
router.use(product);
router.use(search);

module.exports = router;

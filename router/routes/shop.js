var { Router } = require('express');
var { generateShopifyCallback, shopifyInstall, getShopInfo } = require ('../controllers/shop');

const router = Router();

router.get('/api/v1/auth/callback', generateShopifyCallback);
router.get('/api/v1/auth', shopifyInstall);
router.get('/api/v1/shop', getShopInfo);

module.exports = router;

var cookie = require('cookie');
var shopDBService = require('../../services/DB/shop');
var config = require('../../utils/config');

const nonce = require('nonce')();

const scopes = 'write_products, write_themes';

const generateShopifyCallback = async (req, res, next) => {
  const {
    shop, hmac, code, state,
  } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;
  const { apiKey } = config;
  const { apiSecret } = config;

  if (state && state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified');
  }

  if (!shop || !hmac || !code) {
    return res.status(400).send('Required parameters missing');
  }

  try {
    await shopDBService
      .getShopifyCallback(shop, hmac, code, apiSecret, apiKey, req.query);
  } catch (err) {
    return next(err);
  }

  res.cookie('shop', shop);
  return res.redirect(`https://${shop}/admin/apps/custom-swatches-1`);
};


const shopifyInstall = async (req, res, next) => {
  const { shop } = req.query;
  const { host } = req.headers;
  const forwardingAddress = `https://${host}`;

  if (shop) {
    const state = nonce();
    const redirectUri = `${forwardingAddress}/api/v1/auth/callback`;
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${config.apiKey}&scope=${scopes}&state=${state}&redirect_uri=${redirectUri}`;
    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
};

const getShopInfo = async (req, res, next) => {
  const { shop } = req.appContext;
  let shopResponse;

  if (!shop) {
    return res.status(500).json({
      success: false,
    });
  }

  try {
    shopResponse = await shopDBService
      .getShop(shop);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: shopResponse,
  });
};

module.exports = {
  generateShopifyCallback,
  shopifyInstall,
  getShopInfo,
};

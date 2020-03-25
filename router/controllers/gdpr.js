var gdprDBService = require('../../services/DB/gdpr');
var shopDBService = require('../../services/DB/shop');
var webhookDBService = require('../../services/DB/webhook');

const gdprCustomerRedact = async (req, res, next) => {
  const { customer, shop_domain } = req.body; // eslint-disable-line
  const shop = shop_domain; // eslint-disable-line
  const { email } = customer;
  let response;

  try {
    response = await gdprDBService
      .customerRedact(email, shop);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: response,
  });
};

const gdprShopRedact = async (req, res, next) => {
  const payload = req.body;
  const shop = payload.shop_domain;
  let response;

  try {
    const currentShop = await shopDBService
      .getShopWithToken(shop);

    const { token } = currentShop;

    const existedWebhooks = await webhookDBService
      .getWebhookList(shop, token);

    await webhookDBService
      .bulkRemoveWebhook(shop, token, existedWebhooks);

    await webhookDBService
      .bulkRemoveShopWebhooks(shop, token);

    response = await gdprDBService
      .shopRedact(currentShop);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: response,
  });
};

const gdprCustomerDadaRequest = async (req, res, next) => {
  const payload = req.body;
  const shop = payload.shop_domain;
  const { email } = payload.customer;

  let response;

  try {
    response = await gdprDBService
      .customerDadaRequest(shop, email);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: response,
  });
};

module.exports = {
  gdprCustomerRedact,
  gdprShopRedact,
  gdprCustomerDadaRequest,
};

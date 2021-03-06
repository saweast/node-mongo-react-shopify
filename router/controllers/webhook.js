var webhookDBService = require('../../services/DB/webhook');

const createWebhook = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { webhook } = req.body;
  let webhookResponse;

  try {
    webhookResponse = await webhookDBService
      .createWebhook(shop, token, webhook);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: webhookResponse,
  });
};

const bulkCreateWebhookList = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { webhooks } = req.body;
  let webhookResponse;

  try {
    webhookResponse = await webhookDBService
      .bulkCreateWebhook(shop, token, webhooks);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: webhookResponse,
  });
};

const bulkUpdateWebhookList = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { webhooks } = req.body;
  let webhookResponse;

  try {
    const existedWebhooks = await webhookDBService
      .getWebhookList(shop, token);

    await webhookDBService
      .bulkRemoveWebhook(shop, token, existedWebhooks);

    await webhookDBService
      .bulkRemoveShopWebhooks(shop, token);

    webhookResponse = await webhookDBService
      .bulkCreateWebhook(shop, token, webhooks);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: webhookResponse,
  });
};

const removeWebhook = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { webhookId } = req.params;
  let webhookResponse;

  try {
    webhookResponse = await webhookDBService
      .removeWebhook(shop, token, webhookId);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: webhookResponse,
  });
};

const getWebhookList = async (req, res, next) => {
  const { shop, token } = req.appContext;
  const { list } = req.body;
  let webhookResponse;

  try {
    webhookResponse = await webhookDBService
      .getWebhookList(shop, token, list);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: webhookResponse,
  });
};

const orderPaidHandler = async (req, res, next) => {
  const shop = req.headers['x-shopify-shop-domain'];
  const payload = req.body;
  let webhookResponse;

  try {
    webhookResponse = await webhookDBService
      .orderPaidWebhook(payload, shop);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: webhookResponse,
  });
};

const orderFulfilledHandler = async (req, res, next) => {
  const shop = req.headers['x-shopify-shop-domain'];
  const payload = req.body;
  let webhookResponse;

  try {
    webhookResponse = await webhookDBService
      .orderFulfilledWebhook(payload, shop);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: webhookResponse,
  });
};

const checkoutUpdateHandler = async (req, res, next) => {
  const shop = req.headers['x-shopify-shop-domain'];
  const payload = req.body;
  let webhookResponse;

  try {
    webhookResponse = await webhookDBService
      .checkoutUpdateWebhook(payload, shop);
  } catch (err) {
    return next(err);
  }

  return res.status(200).json({
    success: true,
    result: webhookResponse,
  });
};

module.exports = {
  createWebhook,
  checkoutUpdateHandler,
  orderFulfilledHandler,
  orderPaidHandler,
  getWebhookList,
  removeWebhook,
  bulkCreateWebhookList,
  bulkUpdateWebhookList,
};

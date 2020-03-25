var { Router } = require('express');
var {
  gdprCustomerRedact,
  gdprShopRedact,
  gdprCustomerDadaRequest,
} = require('../controllers/gdpr');

const router = Router();

router.post('/api/v1/gdpr/customers/redact', gdprCustomerRedact);
router.post('/api/v1/gdpr/shop/redact', gdprShopRedact);
router.post('/api/v1/gdpr/customers/data_request', gdprCustomerDadaRequest);

module.exports = router;

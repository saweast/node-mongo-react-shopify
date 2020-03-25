var { Router } = require('express');
var { saveItem, getConfig } = require('../controllers/config');

const router = Router();

router.post('/api/v1/config', saveItem);
router.get('/api/v1/config', getConfig);

module.exports = router;

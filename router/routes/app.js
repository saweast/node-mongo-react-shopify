var { Router } = require('express');
var { uninstallApp } = require('../controllers/app');

const router = Router();

router.post('/api/v1/app/uninstalled', uninstallApp);

module.exports = router;

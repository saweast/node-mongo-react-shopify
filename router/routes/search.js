var { Router } = require('express');
var { searchProducts, searchProductsRest } = require('../controllers/search');

const router = Router();

router.post('/api/v1/gql/search/products', searchProducts);
router.post('/api/v1/search/products', searchProductsRest);

module.exports = router;

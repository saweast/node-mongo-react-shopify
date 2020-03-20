var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET product item. */
router.get('/:handle', function (req, res, next) {
  axios.get(`https://digitalstore-dev.myshopify.com/products/${req.params.handle}.json`).then((response) => {
    res.send(response.data.product);
  }).catch((error) => {
    res.send(error);
  });
});

module.exports = router;

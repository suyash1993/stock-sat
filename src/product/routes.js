const express = require('express')
const router = express.Router()
const errors = require('../errors');
const productModel = require('./product')


router.post('/product', (req, res) => {
  productModel.insertProduct(req)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
})

router.get('/product/:category', (req, res) => {
  productModel.getProductByCategory(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => {
      if (error instanceof errors.RecordNotFoundError) {
        res.status(404).send(error);
      } else {
        res.status(500).send(error);
      }
    });
})

router.put('/product/:uuid', (req, res) => {
  productModel.updateProduct(req)
    .then((response) => {
      res.status(204).send({});
    })
    .catch(error => {
      if (error instanceof errors.RecordNotFoundError) {
        res.status(404).send(error);
      } else {
        res.status(500).send(error);
      }
    });
})

module.exports = router;
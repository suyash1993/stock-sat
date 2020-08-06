const express = require('express')
const router = express.Router()
const categoryModel = require('./category')


router.post('/category', (req, res) => {
  categoryModel.insertCategory(req)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
})

router.get('/category/list', (req, res) => {
  categoryModel.getCategoryList(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
})

module.exports = router;

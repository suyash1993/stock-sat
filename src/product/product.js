const { v4: uuidv4 } = require('uuid');
const errors = require('../errors');
const lodash = require('lodash');


module.exports = {

  insertProduct: async function insertProduct(req) {
    try {
      const db = req.app.locals.db;
      const data = req.body;

      data.uuid = uuidv4();
      data.created_date_time = new Date();
      data.modified_date_time = new Date();

      const response = await db.collection('product').insertOne(data, { wtimeout: 10000, forceServerObjectId: true });
      return response.ops[0];
    } catch (err) {
      console.error('Error while insertProduct -: ', err);
      throw err;
    }
  },

  getProductByCategory: async function getProductByCategory(req) {
    try {
      const db = req.app.locals.db;
      const category = req.params.category;
      let response = {};

      const record = await db.collection('category').findOne({ uuid: category });
      if (lodash.isEmpty(record)) {
        throw new errors.RecordNotFoundError('category', category);
      } else {
        response = await db.collection('product').find({ categories: category }).project({ _id: 0 }).toArray();
      }
      return response;
    } catch (err) {
      console.error('Error while getProductByCategory -: ', err);
      throw err;
    }
  },

  updateProduct: async function updateProduct(req) {
    try {
      const db = req.app.locals.db;
      const uuid = req.params.uuid;
      let response = {};
      const updtData = req.body;
      updtData.modified_date_time = new Date();

      const record = await db.collection('product').findOne({ uuid: uuid });
      if (lodash.isEmpty(record)) {
        throw new errors.RecordNotFoundError('product', uuid);
      } else {
        response = await db.collection('product').updateOne({ uuid: uuid }, { "$set": updtData }, { wtimeout: 10000 });
      }
      return response;
    } catch (err) {
      console.error('Error while updateProduct -: ', err);
      throw err;
    }
  }

}
const { v4: uuidv4 } = require('uuid');

module.exports = {

  insertCategory: async function insertCategory(req) {
    try {
      const db = req.app.locals.db;
      const data = req.body;

      data.uuid = uuidv4();
      data.created_date_time = new Date();
      data.modified_date_time = new Date();

      const response = await db.collection('category').insertOne(data, { wtimeout: 10000, forceServerObjectId: true });
      return response.ops[0];
    } catch (err) {
      console.error('Error while insertCategory -: ', err);
      throw err;
    }
  },

  getCategoryList: async function getCategoryList(req) {
    try {
      const db = req.app.locals.db;
      const response = await db.collection('category').find({}).project({ _id: 0 }).toArray();
      return response;
    } catch (err) {
      console.error('Error while getCategoryList -: ', err);
      throw err;
    }
  }
}
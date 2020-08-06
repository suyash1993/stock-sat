module.exports = {
  async up(db) {

    await db.createCollection('product', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['uuid', 'created_date_time', 'product_name'],
          properties: {
            uuid: {
              bsonType: 'string',
              description: 'uuid must be a string and is mandatory'
            },
            product_name: {
              bsonType: 'string',
              description: 'address line 2 must be a string and is mandatory'
            },
            price: {
              bsonType: 'double',
              description: 'address line 2 must be a double and is mandatory'
            },
            warehouse: {
              bsonType: 'string',
              description: 'warehouse must be a string and is mandatory'
            },
            created_date_time: {
              bsonType: 'date',
              description: 'created_date_time must be a datetime and is mandatory'
            },
            modified_date_time: {
              bsonType: 'date',
              description: 'modified_date_time must be a datetime and is not mandatory'
            },
            categories: {
              bsonType: 'array',
              description: 'child_categories field must be a array and is not mandatory'
            },
          }
        }
      }
    });
    console.log('Created collection with product collection with success.');

    const product = db.collection('product');

    await product.createIndex({ uuid: -1 }, { unique: true });
    console.log('Created index on product.uuid with success');

    return true;
  },

  async down(db) {
    await db.dropCollection('product');
    console.log('Dropped collection product with success');
    return true;
  },
};

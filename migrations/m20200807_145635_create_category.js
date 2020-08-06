module.exports = {
  async up(db) {

    await db.createCollection('category', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['uuid', 'created_date_time', 'category_name'],
          properties: {
            uuid: {
              bsonType: 'string',
              description: 'uuid must be a string and is mandatory'
            },
            category_name: {
              bsonType: 'string',
              description: 'category_name must be a string and is mandatory'
            },
            created_date_time: {
              bsonType: 'date',
              description: 'created_date_time must be a datetime and is mandatory'
            },
            modified_date_time: {
              bsonType: 'date',
              description: 'modified_date_time must be a datetime and is not mandatory'
            },
            products: {
              bsonType: 'array',
              description: 'products field must be a array and is not mandatory'
            },
            child_categories: {
              bsonType: 'array',
              description: 'child_categories field must be a array and is not mandatory'
            },
          }
        }
      }
    });
    console.log('Created collection with category collection with success.');

    const category = db.collection('category');

    await category.createIndex({ uuid: -1 }, { unique: true });
    console.log('Created index on category.uuid with success');

    return true;
  },

  async down(db) {
    await db.dropCollection('category');
    console.log('Dropped collection category with success');
    return true;
  },
};

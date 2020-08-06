const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const mongodb = require('./db')
const port = 3007


app.get('/', (req, res) => {
  res.send('Hello Heady Technologies!');
})


app.use(bodyParser.json({}));

const client = new mongodb(app);

async function setup() {
  await client.connect();
  await client.initMigration();
  
  const entity = ['category', 'product'];
  for (const ent of entity){
    let routes = require(`./${ent}/routes`);
    app.use(routes);
  }
  
  return true;
}

setup()
  .then(() => {
    app.listen(port, () => {
      console.log(`Stock-SAT app listening at http://localhost:${port}`);
    })
  })
  .catch((err) => {
    console.error('Error while setup', err);
  });

module.exports = app;
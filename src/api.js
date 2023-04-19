const express = require("express");
const cors = require('cors');
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const dataForge = require('data-forge');
const config = require('./config/config');
const logger = require('./config/logger');

const app = express();
// const router = express.Router();
const routes = require('./routes');

// enable cors
app.use(cors());
app.options('*', cors());

// read config file yaml
const yamlFile = config.files || 'config-gitapi.yaml';
logger.info(`index.js > yamlFile : ${yamlFile}`);

const data = [
  { "name": "item A", "description": "Lorem ipsum dolor sit amet" }, 
  { "name": "item B", "description": "consectetur adipiscing elit" }, 
  { "name": "item C", "description": "sed do eiusmod tempor incididunt" }
];
let df = new dataForge.DataFrame(data);
console.log('\nindex.js > df.head(3).toString() :\n', df.head(3).toString());

app.set('data', data);
app.set('df', df);

app.use(bodyParser.json())
app.use(`/.netlify/functions/api`, routes); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

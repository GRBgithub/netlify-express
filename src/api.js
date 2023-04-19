// const express = require("express");
// const cors = require('cors');
// const serverless = require("serverless-http");
// const bodyParser = require('body-parser');
// const dataForge = require('data-forge');
// const config = require('./config/config');
// const logger = require('./config/logger');
// const routes = require('./routes');

import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import dataForge from 'data-forge';
import { data, df } from './config/dataLoader.js';
import router from './routes/index.js';

const app = express();
// const router = express.Router();

// read config file yaml
// const yamlFile = config.files || 'config-gitapi.yaml';
// logger.info(`index.js > yamlFile : ${yamlFile}`);
// const configData = await readYamlFile(yamlFile);
// console.log('index.js > configData :\n', configData);

// Load data from csv
// const data = [
//   { "name": "item A", "description": "Lorem ipsum dolor sit amet" }, 
//   { "name": "item B", "description": "consectetur adipiscing elit" }, 
//   { "name": "item C", "description": "sed do eiusmod tempor incididunt" }
// ];
// let df = new dataForge.DataFrame(data);
// console.log('\nindex.js > df.head(3).toString() :\n', df.head(3).toString());

// Finishing setting the app
app.set('data', data);
app.set('df', df);

// enable cors
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json())
app.use(`/.netlify/functions/api`, router); // path must route to lambda

// module.exports = app;
// module.exports.handler = serverless(app);

export default app;
export const handler = serverless(app);

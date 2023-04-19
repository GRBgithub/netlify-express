// const config = require('./config');
// const logger = require('./logger');
// const sourceData = require('../utils/sourceData');
// const dataForge = require('data-forge');

import * as config from './config.js';
import logger from './logger.js';
import dataForge from 'data-forge';

export const asyncMsg = await Promise.resolve('WORKS!');
// console.log(asyncMsg); // "WORKS!"
logger.info(`dataLoader.js > asyncMsg : ${asyncMsg}`);

// read config file yaml
export const yamlFile = config.files || 'config-gitapi.yaml';
logger.info(`dataLoader.js > yamlFile : ${yamlFile}`);
// const configData = await readYamlFile(yamlFile);
// console.log('dataLoader.js > configData :\n', configData);

export const data = [
  { "name": "item A", "description": "Lorem ipsum dolor sit amet" }, 
  { "name": "item B", "description": "consectetur adipiscing elit" }, 
  { "name": "item C", "description": "sed do eiusmod tempor incididunt" }
];
export const df = new dataForge.DataFrame(data);
console.log('\nindex.js > df.head(3).toString() :\n', df.head(3).toString());

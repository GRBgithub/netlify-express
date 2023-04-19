import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

// const dotenv = require('dotenv');
// const path = require('path');
// const Joi = require('joi');


dotenv.config({ path: '../../.env' });
// dotenv.config({ path: path.join(__dirname, '../../.env') });

const defaultConfigYaml = './config-gitapi.yaml'

const envVarsSchema = Joi.object()
  .keys({
    // NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    CONFIG_FILE_YAML: Joi.string().default(defaultConfigYaml).description('source config file path'),
  })
  .unknown();
// console.log('config.js > envVarsSchema : ', envVarsSchema)

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// console.log('config.js > envVars.NODE_ENV : ', envVars.NODE_ENV)
console.log('config.js > envVars.PORT : ', envVars.PORT)
console.log('config.js > envVars.CONFIG_FILE_YAML : ', envVars.CONFIG_FILE_YAML)

// module.exports = {
//     // env: envVars.NODE_ENV,
//     port: envVars.PORT,
//     files: envVars.CONFIG_FILE_YAML,
//   };

export const port = envVars.PORT;
export const files = envVars.CONFIG_FILE_YAML;

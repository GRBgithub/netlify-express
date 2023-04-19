const logger = require('../config/logger');
const yaml = require('js-yaml');
const fsPromise = require('fs').promises;
const fs = require('fs');
const { parse } = require('csv-parse');

// import yaml from 'js-yaml';
// import { promises as fs } from 'fs';
// import { DataFrame as Dframe } from 'data-forge';

const readYamlFile = async (filePath) => {
  let data;
  try {
    const dataFile = await fsPromise.readFile(filePath, 'utf8');
    data = dataFile.toString();
    // console.log('utils > sourceData.js > readYamlFile > data :\n', data);
    data = yaml.load(data);
  } catch (error) {
    logger.error(`Got an error trying to read the file: ${error.message}`);
  }
  return data;
};

const readCsvFile = async (filePath, sep) => {
  const headers = {};
  const data = [];
  let idx = 1;
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const parser = fs.createReadStream(filePath).pipe(parse({ delimiter: sep, from_line: 1 }));
  // eslint-disable-next-line no-restricted-syntax
  for await (const row of parser) {
    // Work with each row
    if (idx === 1) {
      const rawHeaders = { ...row };
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const prop in rawHeaders) {
        headers[prop] = rawHeaders[prop].trim();
      }
    } else {
      const item = { ...row };
      data.push(item);
    }
    idx += 1;
  }
  return {
    headers,
    data,
  };
};

const readJsonFile = (filePath) => {
  const rawdata = fs.readFileSync(filePath);
  const data = JSON.parse(rawdata);
  return data;
};

const readSourceFiles = async (files) => {
  // console.log(`\nutils > sourceData.js > readYamlFile > files :`, files);

  const datasets = [];
  let idx = 0;

  // eslint-disable-next-line no-restricted-syntax, no-undef
  for await (const f of files) {
    logger.info('\n');
    const filePath = f.file;
    const schemaPath = f.schema;
    logger.info(`sourceData > readSourceFiles > ${idx} > filePath : ${filePath}`);
    const hostSrc = filePath.startsWith('http') ? 'distant' : 'statics';
    const hostSchema = schemaPath.startsWith('http') ? 'distant' : 'statics';

    const fileSplit = filePath.split('.');
    const schemaSplit = schemaPath.split('.');

    // build data
    const sourceMeta = {
      src: filePath,
      host: hostSrc,
      sep: f.options.separator || ';',
      type: fileSplit[fileSplit.length - 1],
    };
    // console.log(`\ndata > readSourceFiles > ${idx} > sourceMeta :\n`, sourceMeta);
    const dataset = await readCsvFile(sourceMeta.src, sourceMeta.sep);
    // console.log(`\ndata > readSourceFiles > ${idx} > dataset :\n`, dataset);

    // build schema
    const schemaMeta = {
      src: schemaPath,
      host: hostSchema,
      type: schemaSplit[schemaSplit.length - 1],
    };
    console.log(`\nschema > readSourceFiles > ${idx} > schemaMeta :\n`, schemaMeta);
    // get json schema if any
    let schemaObj = {};
    if (schemaPath) {
      schemaObj = readJsonFile(schemaPath);
    }
    // console.log(`\nschema > readSourceFiles > ${idx} > schemaObj :\n`, schemaObj);

    const data = {
      index: idx,
      meta: {
        source: { ...sourceMeta },
        schema: { ...schemaMeta },
      },
      data: dataset.data,
      headers: dataset.headers,
      schema: schemaObj,
    };
    datasets.push(data);
    idx += 1;
  }

  // console.log(`\nschemaMeta > readSourceFiles > ${idx} > datasets :\n`, datasets);
  return datasets;
};

module.exports = {
  readYamlFile,
  readCsvFile,
  readJsonFile,
  readSourceFiles,
};

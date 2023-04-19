'use strict';

// const app = require('./src/api');
// const routes = require('./src/routes');
// const config = require('./src/config/config');

import app from './api.js';
import router from './routes/index.js';
import * as config from './config/config.js';

const port = config.port || 3000;

app.use(`/`, router); // path must route to lambda
app.listen(port, () => console.log(`Local app listening on port ${port}!`));

'use strict';

const app = require('./src/api');
const routes = require('./src/routes');
const config = require('./src/config/config');

const port = config.port || 3000;

app.use(`/`, routes); // path must route to lambda
app.listen(port, () => console.log(`Local app listening on port ${port}!`));

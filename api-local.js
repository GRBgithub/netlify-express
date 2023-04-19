'use strict';

const app = require('./src/api');
const routes = require('./src/routes');
const config = require('./src/config/config');

app.use(`/`, routes); // path must route to lambda
app.listen(3000, () => console.log('Local app listening on port 3000!'));

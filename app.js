require('dotenv').config()
const { logger } = require('./utils');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => logger.info(`Connected on port ${port}`));
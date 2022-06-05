const { logger } = require('../utils');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose
        .connect('mongodb://127.0.0.1:27017/shecomerce')
        .then(() => logger.info('Connected to the mongodb database.'));
}
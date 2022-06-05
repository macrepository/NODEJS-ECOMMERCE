const { logger } = require('../utils');
const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        console.error("FATAL ERROR: jwtPrivateKey is not defined.");
        logger.critical('FATAL ERROR: jwtPrivateKey is not defined.');
        logger.critical('System process exited!');
        process.exit(1);   
    }
}
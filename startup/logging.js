const { logger } = require('../utils');

module.exports =  function () {
    process.on('uncaughtException', (ex) => {
        logger.critical(ex.message);
       
    });

    process.on('unhandledRejection', (ex) => {
        logger.critical(ex.message);
    });
}
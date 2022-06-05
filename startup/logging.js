const { logger } = require('../utils');

module.exports =  function () {
    process.on('uncaughtException', (ex) => {
        logger.critical(ex.message);
       
    });

    process.on('unhandledRejecttion', (ex) => {
        logger.critical(ex.message);
    });
}
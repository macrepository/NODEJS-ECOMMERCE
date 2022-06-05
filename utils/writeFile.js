const moment = require('moment-timezone');
const path = require('path');
const fs = require('fs');

/**
 * 
 * @param {string} _path 
 * @param {string} content 
 * @param {boolean} addTimestamp 
 */
module.exports = function write(_path, content, addTimestamp = false) {
    const timestamp = moment.tz('UTC').format('YYYY-MM-DD HH:mm:ss');
    const dir = path.dirname(_path);
    
    if (addTimestamp) content = `${timestamp} ${content} \n`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFile(_path, content, { flag: 'a+' }, err => {});
}
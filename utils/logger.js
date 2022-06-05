const __write = require('./writeFile');

const __LOGDIR = process.cwd() + '/var/log/';
const types = {
    alert: { 
        label: 'ALERT', 
        filename: 'system.log' 
    },
    critical: { 
        label: 'CRITICAL', 
        filename: 'exception.log' 
    },
    debug: { 
        label: 'DEBUG', 
        filename: 'debug.log' 
    },
    emergency: { 
        label: 'EMERGENCY', 
        filename: 'system.log' 
    },
    error: { 
        label: 'ERROR', 
        filename: 'debug.log' 
    },
    info:  { 
        label: 'INFO', 
        filename: 'system.log' 
    },
    log: { 
        label: 'LOG', 
        filename: 'system.log' 
    },
    notice: { 
        label: 'NOTICE', 
        filename: 'system.log' 
    },
    warning:{ 
        label: 'WARNING', 
        filename: 'system.log' 
    }
};

/**
 * Write important details
 * @param {string} message 
 * @param {string} type 
 * @param {string} filename 
 */
function write(message, type = 'info', filename = false) {
    if (!filename) filename = types[type].filename;

    __write(__LOGDIR + filename, `${types[type].label}: ${message}`, true);
}

/**
 * Log alert message
 * @param {string} message 
 */
function alert(message) {
    const type = types.alert;

    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

/**
 * Log critical message
 * @param {string} message 
 */
 function critical(message) {
    const type = types.critical;
    
    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

/**
 * Log debug message
 * @param {string} message 
 */
 function debug(message) {
    const type = types.debug;

    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

/**
 * Log emergency message
 * @param {string} message 
 */
 function emergency(message) {
    const type = types.emergency;

    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

/**
 * Log error message
 * @param {string} message 
 */
 function error(message) {
    const type = types.error;

    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

/**
 * Log info message
 * @param {string} message 
 */
 function info(message) {
    const type = types.info;

    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

/**
 * Log log message
 * @param {string} message 
 */
 function log(message) {
    const type = types.log;

    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

/**
 * Log notice message
 * @param {string} message 
 */
 function notice(message) {
    const type = types.notice;

    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

/**
 * Log warning message
 * @param {string} message 
 */
 function warning(message) {
    const type = types.warning;

    __write(__LOGDIR + type.filename, `${type.label}: ${message}`, true);
}

module.exports = {
    write,
    alert,
    critical,
    debug,
    info,
    emergency,
    error,
    info,
    log,
    notice,
    warning
}
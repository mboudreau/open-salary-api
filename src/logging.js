/* global process:true, __dirname:true */

'use strict';

var fs = require('fs'),
    path = require('path'),
    bunyan = require('bunyan');

exports.createLogger = createLogger;

/*
 * configure and start logging
 * @param {Object} settings The configuration object for defining dir: log
 * directory, level: loglevel
 * @return the created logger instance
 */
function createLogger(settings) {

    var pkg = require('../package.json'),
        appName = settings.name || pkg.name,
        appVersion = pkg.version,
        logDir = settings.dir || '/logs',
        logFile = path.join(logDir, appName + '-log.json'),
        logErrorFile = path.join(logDir, appName + '-errors.json'),
        logLevel = settings.level || 'debug';

    // Create log directory if it doesnt exist
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    // Log to console and log file
    var log = bunyan.createLogger({
        name: appName,
        streams: [
            {
                stream: process.stdout,
                level: logLevel
            },
            {
                path: logFile,
                level: logLevel,
                type: 'rotating-file',
                period: '1d'
            },
            {
                path: logErrorFile,
                level: 'error'
            }
        ],
        serializers: bunyan.stdSerializers
    });

    log.info('Starting ' + appName + ', version ' + appVersion);
    log.debug('Logging setup completed.');

    return log;
}

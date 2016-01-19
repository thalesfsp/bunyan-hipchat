/**
 * @author Thales Pinheiro <thalesfsp@gmail.com>
 * @since 01/2016
 * @requires lib/index
 * @requires bunyan
 * Example of how to use the HipChat plugin
 */

// Dependencies
var BunyanHipchat = require('../lib/index.js');
var bunyan = require('bunyan');

// Setup plugin
var loggerName = 'My own logger';
var minimumLevelToLog = 'trace';
var logType = 'raw';

// Mock/Fake user
var user = {
  '_id': '569c28e1ba408c4d9053fb27',
  'index': 0,
  'guid': '526f20c6-9a7a-4d09-a6a5-db357e5061b9',
  'isActive': true,
  'balance': '$2,352.58',
  'picture': 'http://placehold.it/32x32',
  'age': 39,
  'eyeColor': 'green',
  'name': {
    'first': 'Murphy',
    'last': 'Goff'
  }
};

// Add plugin to Bunyan
var logger = bunyan.createLogger({
  name: loggerName,
  streams: [
    {
      level: minimumLevelToLog,
      stream: process.stdout
    }, {
      level: minimumLevelToLog,
      stream: new BunyanHipchat({
        token: process.env.TOKEN, // Taken from the environment variable
        roomId: process.env.ROOMID // Taken from the environment variable
      }),
      type: logType
    }
  ]
});

// Test levels
logger.trace('trace');
logger.debug('debug');
logger.info({user: user}, 'Fake user');
logger.warn('warn');
logger.error('error');
logger.fatal('fatal');

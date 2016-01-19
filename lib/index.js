/**
 * @author Thales Pinheiro <thalesfsp@gmail.com>
 * @since 01/2016
 * @requires https
 * @requires debug
 * @requires lodash.message
 * HipChat plugin for Bunyan
 */

'use strict';

// Dependencies

var https = require('https');
var debug = require('debug')('index');
var merger = require('lodash.merge');

// Variables

var defaultOptions = { // See HipChatStream documentation for more info
  organization: 'api',
  message: {
    format: 'html'
  },
  colors: {
    '10': 'gray',
    '20': 'gray',
    '30': 'green',
    '40': 'yellow',
    '50': 'red',
    '60': 'purple'
  }
};

// Functions

/**
 * Construct a new HipChatStream
 *
 * @param {Object} options Plugin options
 * @param {String} options.token HipChat token
 * @param {String} options.roomId HipChat room identification
 * @param {String} [options.organization='api'] organization name (if there's one)
 * @param {String} [options.message.format='html'] Determines how the message is
 *   treated by the server and rendered inside HipChat applications.
 *   <a href="https://goo.gl/43DKN">Click for more information</a>
 * @param {Object} [options.colors='pre-defined'] maps Bunyan severity <-> Message color
 */
var HipChatStream = function(options) {
  // pre-initialize options, if not, the options validation step breaks
  //   in case of no options be provided
  options = options || {};

  // Validate options
  if (!options.token || !options.roomId) throw new Error('You need to pass token and roomId!');

  // Merge options and defaultOptions
  merger(defaultOptions, options);

  // Assign options
  this.options = defaultOptions;
};

/**
 * Consumed by Bunyan stream
 *
 * @param {Object} json JSON sent by Bunyan with log information
 */
var write = function(json) {
  // Build the body of the request
  var body = JSON.stringify({
    'color': this.options.colors[json.level],
    'message': '<pre>' + JSON.stringify(json, null, 4) + '</pre>',
    'notify': true,
    'message_format': this.options.message.format
  });

  // Request options
  var reqOpt = {
    method: 'POST',
    hostname: this.options.organization + '.hipchat.com',
    path: '/v2/room/' + this.options.roomId + '/notification?auth_token=' + this.options.token,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  };

  // Mount the request
  var req = https.request(reqOpt, function (res) {
    debug('STATUS: ', res.statusCode);
    debug('HEADERS: ', JSON.stringify(res.headers));

    // Best practice
    res.setEncoding('utf8');

    // What is being sent
    res.on('data', function (chunk) {
      debug('BODY:', chunk);
    });

    // Notify that there's nothing more to send
    res.on('end', function () {
      debug('No more data in response.');
    });
  });

  // In case of error
  req.on('error', function (e) {
    debug('problem with request: ', e.message);
  });

  // Do the request - send body
  req.write(body);

  // Best practice: close stream
  req.end();
};

/**
 * Extend HipChatStream
 */

HipChatStream.prototype.write = write;

/**
 * Exported functions
 *
 * @description Main module
 * @exports HipChatStream
 */

module.exports = HipChatStream;

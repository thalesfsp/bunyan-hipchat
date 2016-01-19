/**
 * @author Thales Pinheiro <thalesfsp@gmail.com>
 * @since 01/2016
 * HipChat plugin for Bunyan
 */

'use strict';

/**
 * Dependencies
 */

var https = require('https');
var merger = require('lodash.merge');

/**
 * Variables
 */

var defaultOptions = {
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

/**
 * Functions
 */

/**
 * Construct a new HipChatStream
 *
 * @param {Object} options Plugin options
 * @param {String} options.token HipChat token
 * @param {String} options.roomId HipChat room identification
 * @param {String} [options.organization='api'] organization name (if there's one)
 * @param {String} [options.message.format='html'] Determines how the message is
 *   treated by the server and rendered inside HipChat applications. 'text' or 'html'
 *   @see https://goo.gl/43DKN for more information
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
  this.options = options;
};

/**
 * Consumed by Bunyan
 *
 * @param {Object} json json sent by Bunyan with log information
 */
HipChatStream.prototype.write = function(json) {
  // Build the body of the request
  var body = JSON.stringify({
    'color': this.options.colors[json.level],
    'message': '<pre>' + JSON.stringify(json, null, 4) + '</pre>',
    'notify': true,
    'message_format': this.options.message.format
  });

  // Send the request
  https.request({
    method: 'POST',
    hostname: this.organization + '.hipchat.com',
    path: '/v2/room/' + this.room + '/notification?auth_token=' + this.token,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  }).write(body);
};

/**
 * Exported functions
 */

module.exports = HipChatStream;

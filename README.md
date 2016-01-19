# bunyan-hipchat

[![Bunyan](https://strongloop.com/wp-content/uploads/2014/05/paul_bunyan_by_brendancorris-d3are2a.jpg.pagespeed.ce.v-jNw7JZo3.jpg)](http://brendancorris.deviantart.com/art/Paul-Bunyan-199472626)
<small>Illustration by [Brendan Corris](http://brendancorris.deviantart.com/art/Paul-Bunyan-199472626)</small>

Stream to write [bunyan](https://github.com/trentm/node-bunyan) logs to [HipChat](http://www.hipchat.com/).

## Usage

```js
var bunyan = require('bunyan');
var BunyanHipchat = require('bunyan-hipchat');

var token = '1234512345123451234512345123451234512345'
var roomID = '12345';

// Add HipChat plugin/stream to Bunyan
var logger = bunyan.createLogger({
  name: 'API',
  streams: [
    {
      level: 'trace',
      stream: process.stdout
    }, {
      level: 'trace',
      stream: new BunyanHipchat({
        token: token,
        roomId: roomId
      }),
      type: 'raw'
    }
  ]
});

// Log different levels
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');
logger.fatal('fatal');
```

## Example

_Note: Don't forget to fill with a valid token and roomId_

```bash
TOKEN="" ROOMID="" npm run example
```

## Contributors

This project was created by Thales Pinheiro ([@thalesfsp](https://github.com/thalesfsp))

## Roadmap

- Next version: 2.0
- Features:
  - Add tests
  - Move to ES6
  - Use [standard](https://www.npmjs.com/package/standard)
  - Allow selection between api V1/V2

# bunyan-hipchat

[![Bunyan](https://strongloop.com/wp-content/uploads/2014/05/paul_bunyan_by_brendancorris-d3are2a.jpg.pagespeed.ce.v-jNw7JZo3.jpg)](http://brendancorris.deviantart.com/art/Paul-Bunyan-199472626)
<small>Illustration by [Brendan Corris](http://brendancorris.deviantart.com/art/Paul-Bunyan-199472626)</small>

Stream to write [bunyan](https://github.com/trentm/node-bunyan) logs to [HipChat](http://www.hipchat.com/).

## Usage

```js
var token = '1234512345123451234512345123451234512345'
var roomID = '12345';

var bunyan = require('bunyan');
var hipchatStream = require('bunyan-elasticsearch');
var logger = bunyan.createLogger({
  name: 'Test', // logger name
  streams: [{
    level: 'trace', // Minimum log level to log
    stream: process.stdout // Normal stdout/console.log
  }, {
    level: 'trace', // Minimum log level to log
    stream: new hipchatStream(token, room),
    type: 'raw'
  }]
});
```

## Contributors

This project was created by Thales Pinheiro ([@thalesfsp](https://github.com/thalesfsp))
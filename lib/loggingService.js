var request = require('request'),
    config  = require('../config.json');

var self = {
  log: function(data){
    request.post({url: config.settings.logging.url, json: data, 
    auth: {
      bearer: config.settings.logging.token
    }}, function(err, result){
      console.log('sent', data, err, result);
    });
  }
};

module.exports = self;

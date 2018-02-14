const config = require('../config'),
    logger = require('../lib/loggingService'),
    util   = require('../lib/util'),
    request = require('request');

var self = {
  gong: function(button){
    var slack = button.slack;
    var giphy = button.giphy;
    util.getGif(giphy, function(err, gif){
      var message = {
          channel: slack.channel,
          text: slack.message+"\n"+gif+"\n",
          icon_emoji: ':clap:',
          username: slack.user
        };
      if(button.timeout){
        setTimeout( function(){util.sendToSlack(message, slack.webhook)}, button.timeout );
      }else{
        util.sendToSlack(message, slack.webhook);
      }
      if(config.logging.enabled)
        logger.log({type: button.name, details: button});
    });
  },
  post: function(button){
    request.post(button.post, function(err, result){
      console.log('sent', err, result);
    });
  },
  text: function(button){
    util.sendText(button);
  },
  get: function(button){
    request.get(button.get.url, button.get.headers, function(er, response){
      console.log(er, response);
    });
  }
}
module.exports = self;

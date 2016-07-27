var config = require('../config'),
    logger = require('../lib/loggingService'),
    request = require('request');

var self = {
  gong: function(button){
    var slack = button.slack;
    var giphy = button.giphy;
    self.getGif(giphy, function(err, gif){
      var message = {
          channel: slack.channel,
          text: slack.message+"\n"+gif+"\n",
          icon_emoji: ':clap:',
          username: slack.user
        };
      if(button.timeout){
        setTimeout( function(){self.sendToSlack(message, slack.webhook)}, button.timeout );
      }else{
        self.sendToSlack(message, slack.webhook);
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
  get: function(button){
    request.get(button.get.url, button.get.headers, function(er, response){
      console.log(er, response);
    });
    },
    getGif: function(giphy, cb){
    var query = self.getRandom(giphy.searchTerms)
    var url = giphy.url+"?q="+query+"&api_key="+giphy.key;
    request.get(url, function(er, response){
      if(er) return cb(er);
      try{
        var gifs = JSON.parse(response.body);
        var gif = 'http://media.giphy.com/media/'+self.getRandom(gifs.data).id+'/giphy.gif';
        return cb(null, gif);
      }catch(e){
        console.log('giphy error', url, response.body);
        return cb({error: e, response: response.body}, null);
      }
    });
  },
  sendToSlack: function(message, url){
    request.post({url: url, json: message}, function(err, result){
      console.log('sent', message);
    });
  },
  getRandom: function(array){
    return array[Math.floor(Math.random()*array.length)];
  }
}
module.exports = self;

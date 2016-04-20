#! /usr/bin/env node

var config = require('./config'),
    dash_button = require('node-dash-button'),
    logger = require('./lib/loggingService'),
    request = require('request');

config.buttons.forEach(function(button){
  var dash = dash_button(button.id);
  dash.on("detected", function (){
    doAction[button.action](button);
  });
});

var doAction = {
  gong: function(button){
    var slack = button.slack;
    var giphy = button.giphy;
    getGif(giphy, function(err, gif){
      var message = {
          channel: slack.channel,
          text: slack.message+"\n"+gif+"\n",
          icon_emoji: ':clap:',
          username: slack.user
        };
      if(button.timer){
        setTimout( function(){sendToSlack(message)}, button.timer );
      }else{
        sendToSlack(message, slack.webhook);
      }
      logger.log({type: button.name, details: button});
      console.log("gong");
    });
  },
  post: function(options){
    request.post(options, function(err, res){
      console.log(err, res);
    });  
  },
  get: function(url){
    request.get(url, function(er, response){
      console.log(er, response);
    });
  }
}

var sendToSlack = function(message, url){
  request.post({url: url, json: message}, function(err, result){
    console.log('sent', message);
  });
};

var getGif = function(giphy, cb){
  var query = getRandom(giphy.searchTerms)
  var url = giphy.url+"?q="+query+"&api_key="+giphy.key;
  request.get(url, function(er, response){
    if(er) return cb(er);
    try{
      var gifs = JSON.parse(response.body);
      var gif = 'http://media.giphy.com/media/'+getRandom(gifs.data).id+'/giphy.gif';
      return cb(null, gif);
    }catch(e){
      console.log('giphy error', url, response.body);
      return cb({error: e, response: response.body}, null);
    }
  });
}

var getRandom = function(array){
  return array[Math.floor(Math.random()*array.length)];
}

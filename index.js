#! /usr/bin/env node

var config = require('./config'),
    dash_button = require('node-dash-button'),
    dash = dash_button(config.button.id);
    request = require('request');

dash.on("detected", function (){
  getGif(getRandom(config.giphy.searchTerms), function(err, gif){
    var message = {
        channel: config.slack.channel,
        text: config.slack.message+"\n"+gif+"\n",
        icon_emoji: ':clap:',
        username: config.slack.user
      };
    sendToSlack(message);
    console.log("gong");
  });
});

var sendToSlack = function(message){
  var url = config.slack.webhook;
  request.post({url: url, json: message}, function(err, result){
    console.log('sent', message);
  });
};

var getGif = function(query, cb){
  var url = config.giphy.url+"?q="+query+"&api_key="+config.giphy.key;
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

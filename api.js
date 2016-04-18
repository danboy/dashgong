#! /usr/bin/env node

var config = require('./config'),
    dash_button = require('node-dash-button'),
    dash = dash_button(config.button.id);
    request = require('request');

dash.on("detected", function (){
  request.get(config.api.url, function(err, response){
    if(err){
      console.log(err)
    }else{
      console.info("successfully sent to "+config.api.url)
    }
  });
});

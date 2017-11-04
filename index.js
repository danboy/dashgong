#! /usr/bin/env node

var config = require('./config'),
    dash_button = require('node-dash-button'),
    logger = require('./lib/loggingService'),
    presses = [],
    request = require('request');

config.buttons.forEach(function(button){
  var dash = dash_button(button.id, null, null, 'all');
  dash.on("detected", function (){
    if(!presses[button.id]){
      doAction[button.action](button);
      presses[button.id] = true;
    };
    setTimeout(function(){presses[button.id]=false},60000)
  });
});

var doAction = require('./lib/router');

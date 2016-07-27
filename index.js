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

var doAction = require('./lib/router');

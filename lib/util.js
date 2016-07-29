var config = require('../config'),
    request = require('request');

var self = {
  sendToSlack: function(message, url){
    request.post({url: url, json: message}, function(err, result){
      console.log('sent', message);
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
  getRandom: function(array){
    return array[Math.floor(Math.random()*array.length)];
  }
}
module.exports = self;

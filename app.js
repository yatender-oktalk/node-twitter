var https = require('https');
var headers = {
  'User-Agent': 'Coding Defined',
  Authorization: 'Bearer ' + require('./oauth.json').access_token
};

function callTwitter(options, callback){
  https.get(options, function(response) {
    jsonHandler(response, callback);
  }).on('error', function(e) {
    console.log('Error : ' + e.message);
  })
}

var trendOptions = {
  host: 'api.twitter.com',
  path: '/1.1/trends/place.json?id=23424848',
  headers: headers
}

function jsonHandler(response, callback) {
  var json = '';
  response.setEncoding('utf8');
  if(response.statusCode === 200) {
    response.on('data', function(chunk) {
      json += chunk;
    }).on('end', function() {
      callback(JSON.parse(json));
    });
  } else {
    console.log('Error : ' + reseponse.statusCode);
  }
}

callTwitter(trendOptions, function(trendsArray) {
  var count = 0;
  trendsArray[0].trends.forEach(function(trend) {
    count++;
    console.log(count + ". " + trend.name);
  })
});

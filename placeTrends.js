
var https = require('https');
const cors = require('cors');
const express = require('express');
let app = express();
app.use(cors());
app.options('*', cors());

function callTwitter(options, callback) {
    console.log('****');
    https.get(options, function (response) {
        jsonHandler(response, callback);
    }).on('error', function (e) {
        console.log('Error : ' + e.message);
    })
}

var headers = {
    'User-Agent': 'Coding Defined',
    Authorization: 'Bearer ' + require('./oauth.json').access_token
};

var trendOptions = {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=2295420',
    headers: headers
}

var arr = [23424848, 2295420, 2295411];

function jsonHandler(response, callback) {
    var json = '';
    response.setEncoding('utf8');
    if (response.statusCode === 200) {
        response.on('data', function (chunk) {
            json += chunk;
        }).on('end', function () {
            callback(JSON.parse(json));
        });
    } else {
        console.log('Error : ' + response.statusCode);
    }
}

app.get('/trending/:id', function (req, res) {

    console.log(req.params.id);
    if (req.params.id) {
        trendOptions.path = '/1.1/trends/place.json?id=' + arr[parseInt(Math.random() * 100 % 3)];
    }
    console.log(trendOptions.path)
    callTwitter(trendOptions, function (trendsArray) {
        var count = 0;
        trendsArray[0].trends.forEach(function (trend) {
            count++;
            console.log(count + ". " + trend.name);
        })
        res.send(trendsArray[0].trends);
    });
});


app.get('/p', function (req, res) {
    res.send('hello world');
});

app.listen(3300);
